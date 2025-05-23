'use client'

import { useNegotiationStore } from '@/lib/store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Hash, Target, MessageSquare } from 'lucide-react'

export default function Step7Anchor() {
  const { anchorStrategy, updateAnchorStrategy, issues } = useNegotiationStore()

  const anchorTypes = [
    {
      value: 'aggressive',
      label: '激进锚点',
      description: '设定较高的初始报价，为后续让步留出空间',
      color: 'bg-red-50 border-red-200 text-red-800'
    },
    {
      value: 'moderate',
      label: '温和锚点',
      description: '设定合理的初始报价，平衡期望与现实',
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    {
      value: 'conservative',
      label: '保守锚点',
      description: '设定较为保守的初始报价，降低谈判风险',
      color: 'bg-green-50 border-green-200 text-green-800'
    }
  ]

  const handleFirstOfferChange = (issueId: string, value: number) => {
    updateAnchorStrategy({
      firstOffer: {
        ...anchorStrategy.firstOffer,
        [issueId]: value
      }
    })
  }

  const addJustification = (text: string) => {
    if (text.trim()) {
      updateAnchorStrategy({
        justification: [...anchorStrategy.justification, text.trim()]
      })
    }
  }

  const removeJustification = (index: number) => {
    updateAnchorStrategy({
      justification: anchorStrategy.justification.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          开场锚点策略
        </h3>
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          锚点效应是谈判中的重要心理现象。你的首次报价将影响整个谈判的走向，
          需要根据你的策略和对方情况来精心设计。
        </p>
      </div>

      {/* 锚点类型选择 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-blue-600" />
            锚点类型
          </CardTitle>
          <CardDescription>
            选择适合你情况的锚点策略
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {anchorTypes.map((type) => (
              <div
                key={type.value}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  anchorStrategy.type === type.value
                    ? type.color
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => updateAnchorStrategy({ type: type.value as any })}
              >
                <div className="font-semibold mb-2">{type.label}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {type.description}
                </div>
                {anchorStrategy.type === type.value && (
                  <Badge className="mt-2 bg-blue-600">已选择</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 首次报价设定 */}
      {issues.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              首次报价
            </CardTitle>
            <CardDescription>
              为每个议题设定你的开场报价
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {issues.map((issue) => (
                <div key={issue.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{issue.name}</h4>
                      <div className="text-sm text-gray-500">
                        理想值: {issue.idealValue} {issue.unit} | 
                        底线: {issue.bottomLine} {issue.unit}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`offer-${issue.id}`}>首次报价</Label>
                      <div className="flex gap-2">
                        <Input
                          id={`offer-${issue.id}`}
                          type="number"
                          value={anchorStrategy.firstOffer[issue.id] || ''}
                          onChange={(e) => handleFirstOfferChange(issue.id, parseFloat(e.target.value) || 0)}
                          placeholder="输入首次报价"
                          step="0.1"
                        />
                        <span className="flex items-center text-sm text-gray-500">
                          {issue.unit}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-end">
                      <div className="text-sm">
                        {anchorStrategy.firstOffer[issue.id] && (
                          <div className="space-y-1">
                            <div className={`px-2 py-1 rounded text-xs ${
                              anchorStrategy.firstOffer[issue.id] > issue.idealValue
                                ? 'bg-red-100 text-red-800'
                                : anchorStrategy.firstOffer[issue.id] >= issue.acceptableValue
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {anchorStrategy.firstOffer[issue.id] > issue.idealValue
                                ? '超出理想值'
                                : anchorStrategy.firstOffer[issue.id] >= issue.acceptableValue
                                ? '理想区间'
                                : '保守报价'
                              }
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 理由准备 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-600" />
            理由准备
          </CardTitle>
          <CardDescription>
            准备支持你报价的合理理由和依据
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>添加理由</Label>
              <div className="flex gap-2 mt-2">
                <Textarea
                  placeholder="例如：根据当地习俗和经济水平，这个金额是合理的..."
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      const target = e.target as HTMLTextAreaElement
                      addJustification(target.value)
                      target.value = ''
                    }
                  }}
                />
                <Button
                  onClick={(e) => {
                    const textarea = (e.target as HTMLElement).parentElement?.querySelector('textarea')
                    if (textarea) {
                      addJustification(textarea.value)
                      textarea.value = ''
                    }
                  }}
                >
                  添加
                </Button>
              </div>
            </div>

            {anchorStrategy.justification.length > 0 && (
              <div>
                <Label>已准备的理由</Label>
                <div className="mt-2 space-y-2">
                  {anchorStrategy.justification.map((reason, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex-1 text-sm">{reason}</div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeJustification(index)}
                      >
                        删除
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 锚点策略总结 */}
      <Card>
        <CardHeader>
          <CardTitle>策略总结</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  锚点类型
                </div>
                <div>
                  {anchorTypes.find(t => t.value === anchorStrategy.type)?.label || '未选择'}
                </div>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="font-semibold text-green-800 dark:text-green-200 mb-2">
                  准备状态
                </div>
                <div className="text-sm">
                  报价: {Object.keys(anchorStrategy.firstOffer).length}/{issues.length} 个议题
                  <br />
                  理由: {anchorStrategy.justification.length} 条
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                锚点使用提醒
              </h4>
              <div className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <p>• 首次报价要有充分的理由支撑，避免显得随意</p>
                <p>• 观察对方的反应，适时调整后续策略</p>
                <p>• 保持自信，但也要显示出谈判的诚意</p>
                <p>• 准备好应对对方可能的反锚点策略</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 完成提示 */}
      {anchorStrategy.type && Object.keys(anchorStrategy.firstOffer).length > 0 && (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
            <Hash className="w-5 h-5" />
            <span className="font-semibold">锚点策略准备完成！</span>
          </div>
          <p className="text-green-700 dark:text-green-300 text-sm mt-1">
            已设定锚点类型和首次报价。点击"下一步"生成完整的谈判准备报告。
          </p>
        </div>
      )}
    </div>
  )
}