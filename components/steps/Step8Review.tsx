'use client'

import { useNegotiationStore } from '@/lib/store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Download, CheckCircle, AlertCircle } from 'lucide-react'
import { exportReport, generateExportContent } from '@/lib/export'
import { useState, useEffect } from 'react'
import ExportPreview from '@/components/ExportPreview'

export default function Step8Review() {
  const {
    goals,
    issues,
    batnaOptions,
    bestBatna,
    bottomLineBuffer,
    stakeholders,
    strategy,
    anchorStrategy,
    reportSettings,
    updateReportSettings
  } = useNegotiationStore()

  const completionStatus = {
    goals: !!(goals.primary && goals.timeline),
    issues: issues.length > 0,
    batna: !!bestBatna,
    stakeholders: stakeholders.length > 0,
    strategy: !!(strategy.approach && strategy.concessionPattern && strategy.timeStrategy),
    anchor: !!(anchorStrategy.type && Object.keys(anchorStrategy.firstOffer).length > 0)
  }

  const completedSteps = Object.values(completionStatus).filter(Boolean).length
  const totalSteps = Object.keys(completionStatus).length

  const [isExporting, setIsExporting] = useState(false)
  const [exportContent, setExportContent] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  // 生成导出内容
  useEffect(() => {
    const content = generateExportContent({
      goals,
      issues,
      batnaOptions,
      bestBatna,
      bottomLineBuffer,
      stakeholders,
      strategy,
      anchorStrategy
    })
    setExportContent(content)
  }, [goals, issues, batnaOptions, bestBatna, bottomLineBuffer, stakeholders, strategy, anchorStrategy])

  const handleExport = async (format: 'png' | 'pdf') => {
    setIsExporting(true)
    updateReportSettings({ format })
    
    try {
      // 创建临时的导出容器
      const exportContainer = document.createElement('div')
      exportContainer.id = 'export-container'
      exportContainer.innerHTML = exportContent
      exportContainer.style.position = 'absolute'
      exportContainer.style.left = '-9999px'
      exportContainer.style.top = '0'
      exportContainer.style.width = '800px'
      exportContainer.style.background = 'white'
      
      document.body.appendChild(exportContainer)

      // 等待内容渲染
      await new Promise(resolve => setTimeout(resolve, 500))

      // 执行导出
      await exportReport('export-container', {
        format,
        filename: `negotiation-report-${new Date().toISOString().split('T')[0]}`,
        scale: 2,
        quality: 0.9
      })

      // 清理临时容器
      document.body.removeChild(exportContainer)
      
      alert(`${format.toUpperCase()} 报告导出成功！`)
    } catch (error) {
      console.error('Export failed:', error)
      alert(`导出失败：${error instanceof Error ? error.message : '未知错误'}`)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* 完成度概览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            准备完成度
          </CardTitle>
          <CardDescription>
            {completedSteps}/{totalSteps} 个模块已完成
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
              />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { key: 'goals', label: '谈判目标', icon: '🎯' },
                { key: 'issues', label: '关键议题', icon: '📋' },
                { key: 'batna', label: 'BATNA计算', icon: '🧮' },
                { key: 'stakeholders', label: '利益相关者', icon: '👥' },
                { key: 'strategy', label: '谈判策略', icon: '🎲' },
                { key: 'anchor', label: '锚点策略', icon: '⚓' }
              ].map((item) => (
                <div key={item.key} className={`p-3 rounded-lg border ${
                  completionStatus[item.key as keyof typeof completionStatus]
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-gray-50 border-gray-200 text-gray-600'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                    {completionStatus[item.key as keyof typeof completionStatus] ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 谈判准备总结 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            谈判准备总结
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* 目标总结 */}
            {completionStatus.goals && (
              <div>
                <h4 className="font-semibold mb-2">🎯 谈判目标</h4>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <p className="font-medium">{goals.primary}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    时间框架: {goals.timeline}
                  </p>
                  {goals.secondary.length > 0 && (
                    <div className="mt-2">
                      <span className="text-sm font-medium">次要目标: </span>
                      {goals.secondary.map((goal, index) => (
                        <Badge key={index} variant="outline" className="mr-1 text-xs">
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 议题总结 */}
            {completionStatus.issues && (
              <div>
                <h4 className="font-semibold mb-2">📋 关键议题 ({issues.length}个)</h4>
                <div className="space-y-2">
                  {issues.slice(0, 3).map((issue) => (
                    <div key={issue.id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{issue.name}</span>
                        <Badge variant="secondary">重要性: {issue.importance}/10</Badge>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        理想值: {issue.idealValue} {issue.unit} | 
                        底线: {issue.bottomLine} {issue.unit}
                      </div>
                    </div>
                  ))}
                  {issues.length > 3 && (
                    <p className="text-sm text-gray-500">还有 {issues.length - 3} 个议题...</p>
                  )}
                </div>
              </div>
            )}

            {/* BATNA总结 */}
            {completionStatus.batna && bestBatna && (
              <div>
                <h4 className="font-semibold mb-2">🧮 最佳BATNA</h4>
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <p className="font-medium">{bestBatna.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    净价值: {bestBatna.netValue?.toFixed(1)} 万元
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {bestBatna.description}
                  </p>
                </div>
              </div>
            )}

            {/* 策略总结 */}
            {completionStatus.strategy && (
              <div>
                <h4 className="font-semibold mb-2">🎲 谈判策略</h4>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">谈判方式: </span>
                      <Badge variant="outline">
                        {strategy.approach === 'collaborative' ? '合作型' :
                         strategy.approach === 'competitive' ? '竞争型' : '迁就型'}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium">让步模式: </span>
                      <Badge variant="outline">
                        {strategy.concessionPattern === 'linear' ? '线性让步' :
                         strategy.concessionPattern === 'exponential' ? '递减让步' : '阶梯让步'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 锚点总结 */}
            {completionStatus.anchor && (
              <div>
                <h4 className="font-semibold mb-2">⚓ 开场锚点</h4>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                  <p className="font-medium">
                    {anchorStrategy.type === 'aggressive' ? '激进锚点' :
                     anchorStrategy.type === 'moderate' ? '温和锚点' : '保守锚点'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    已为 {Object.keys(anchorStrategy.firstOffer).length} 个议题设定首次报价
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 导出选项 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-green-600" />
            导出报告
          </CardTitle>
          <CardDescription>
            生成专业的谈判准备报告，可分享给团队或保存备用
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => handleExport('png')}
                className="h-auto p-4 flex flex-col items-center gap-2"
                variant="outline"
                disabled={isExporting}
              >
                <div className="text-2xl">{isExporting ? '⏳' : '🖼️'}</div>
                <div>
                  <div className="font-medium">PNG 长图</div>
                  <div className="text-xs text-gray-500">
                    {isExporting ? '导出中...' : '适合社交分享'}
                  </div>
                </div>
              </Button>
              
              <Button
                onClick={() => handleExport('pdf')}
                className="h-auto p-4 flex flex-col items-center gap-2"
                variant="outline"
                disabled={isExporting}
              >
                <div className="text-2xl">{isExporting ? '⏳' : '📄'}</div>
                <div>
                  <div className="font-medium">PDF 报告</div>
                  <div className="text-xs text-gray-500">
                    {isExporting ? '导出中...' : '专业文档格式'}
                  </div>
                </div>
              </Button>
            </div>

            <div className="mb-4">
              <Button
                onClick={() => setShowPreview(!showPreview)}
                variant="outline"
                className="w-full"
              >
                {showPreview ? '隐藏预览' : '📋 预览报告内容'}
              </Button>
            </div>

            {showPreview && (
              <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <ExportPreview />
              </div>
            )}

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                报告内容包括
              </h4>
              <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <p>✓ 完整的谈判目标和策略分析</p>
                <p>✓ 详细的议题价值区间图表</p>
                <p>✓ BATNA计算和底线分析</p>
                <p>✓ 利益相关者影响力矩阵</p>
                <p>✓ 开场锚点和理由准备</p>
                <p>✓ 实用的谈判脚本模板</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 下一步建议 */}
      <Card>
        <CardHeader>
          <CardTitle>下一步建议</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-blue-600">1.</span>
              <span>仔细复习准备的内容，确保对每个要点都熟悉</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600">2.</span>
              <span>与信任的朋友或家人进行模拟谈判练习</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600">3.</span>
              <span>准备相关的支撑材料和证据</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600">4.</span>
              <span>选择合适的谈判时间和地点</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-600">5.</span>
              <span>保持开放和尊重的心态，记住目标是达成双赢</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 完成提示 */}
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">
          恭喜！谈判准备已完成
        </h3>
        <p className="text-green-700 dark:text-green-300">
          你已经完成了专业的谈判准备流程。现在你拥有了清晰的目标、
          科学的策略和充分的准备，可以自信地进入谈判了。
        </p>
        <div className="mt-4">
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-green-600 hover:bg-green-700"
          >
            返回首页
          </Button>
        </div>
      </div>
    </div>
  )
}