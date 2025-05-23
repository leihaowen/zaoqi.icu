'use client'

import { useState } from 'react'
import { useNegotiationStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Plus, X, Calculator, TrendingUp, AlertCircle } from 'lucide-react'

export default function Step4Batna() {
  const {
    batnaOptions,
    bestBatna,
    bottomLineBuffer,
    addBatnaOption,
    updateBatnaOption,
    removeBatnaOption,
    calculateBestBatna,
    updateBottomLineBuffer,
    updateGoals
  } = useNegotiationStore()

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    gain: 0,
    directCost: 0,
    riskPenalty: 0,
    switchCost: 0
  })

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      gain: 0,
      directCost: 0,
      riskPenalty: 0,
      switchCost: 0
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleSubmit = () => {
    if (!formData.name.trim()) return

    if (editingId) {
      updateBatnaOption(editingId, formData)
    } else {
      addBatnaOption(formData)
    }
    calculateBestBatna()
    resetForm()
  }

  const handleEdit = (option: any) => {
    setFormData({
      name: option.name,
      description: option.description,
      gain: option.gain,
      directCost: option.directCost,
      riskPenalty: option.riskPenalty,
      switchCost: option.switchCost
    })
    setEditingId(option.id)
    setShowForm(true)
  }

  const handleBufferChange = (value: number) => {
    updateBottomLineBuffer(value)
  }

  const getBottomLine = () => {
    if (!bestBatna) return 0
    return (bestBatna.netValue || 0) - bottomLineBuffer
  }

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          BATNA 计算器
        </h3>
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          BATNA（Best Alternative to a Negotiated Agreement）是你的最佳替代方案。
          通过计算各种备选方案的净价值，确定你的谈判底线。
        </p>
      </div>

      {/* BATNA 公式说明 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-green-600" />
            计算公式
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="text-center text-lg font-mono">
              净价值 = 收益 - 直接成本 - 风险损失 - 转换成本
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-green-600">收益：</span>
                <span className="text-gray-600 dark:text-gray-300">预期获得的价值</span>
              </div>
              <div>
                <span className="font-medium text-red-600">直接成本：</span>
                <span className="text-gray-600 dark:text-gray-300">明确的支出费用</span>
              </div>
              <div>
                <span className="font-medium text-orange-600">风险损失：</span>
                <span className="text-gray-600 dark:text-gray-300">可能的风险成本</span>
              </div>
              <div>
                <span className="font-medium text-purple-600">转换成本：</span>
                <span className="text-gray-600 dark:text-gray-300">切换方案的成本</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 已添加的 BATNA 选项 */}
      {batnaOptions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>BATNA 方案列表</CardTitle>
            <CardDescription>
              所有备选方案及其净价值计算
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {batnaOptions.map((option) => (
                <div key={option.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{option.name}</h4>
                        <Badge 
                          variant={option.id === bestBatna?.id ? "default" : "secondary"}
                        >
                          净价值: {option.netValue?.toFixed(1) || 0} 万元
                        </Badge>
                        {option.id === bestBatna?.id && (
                          <Badge className="bg-green-600">最佳方案</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {option.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(option)}
                      >
                        编辑
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          removeBatnaOption(option.id)
                          calculateBestBatna()
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                    <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                      <div className="text-green-600 font-medium">收益</div>
                      <div className="text-green-800 dark:text-green-200">
                        +{option.gain} 万元
                      </div>
                    </div>
                    <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded">
                      <div className="text-red-600 font-medium">直接成本</div>
                      <div className="text-red-800 dark:text-red-200">
                        -{option.directCost} 万元
                      </div>
                    </div>
                    <div className="text-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                      <div className="text-orange-600 font-medium">风险损失</div>
                      <div className="text-orange-800 dark:text-orange-200">
                        -{option.riskPenalty} 万元
                      </div>
                    </div>
                    <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded">
                      <div className="text-purple-600 font-medium">转换成本</div>
                      <div className="text-purple-800 dark:text-purple-200">
                        -{option.switchCost} 万元
                      </div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                      <div className="text-blue-600 font-medium">净价值</div>
                      <div className="text-blue-800 dark:text-blue-200 font-bold">
                        {option.netValue?.toFixed(1) || 0} 万元
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 最佳 BATNA 和底线 */}
      {bestBatna && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              谈判底线计算
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-green-600 font-medium mb-1">最佳 BATNA</div>
                <div className="text-2xl font-bold text-green-800 dark:text-green-200">
                  {bestBatna.netValue?.toFixed(1)} 万元
                </div>
                <div className="text-sm text-green-600 mt-1">{bestBatna.name}</div>
              </div>
              
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-yellow-600 font-medium mb-1">安全缓冲</div>
                <div className="flex items-center justify-center gap-2">
                  <Input
                    type="number"
                    value={bottomLineBuffer}
                    onChange={(e) => handleBufferChange(parseFloat(e.target.value) || 0)}
                    className="w-20 text-center"
                    step="0.1"
                  />
                  <span className="text-sm">万元</span>
                </div>
                <div className="text-xs text-yellow-600 mt-1">预留安全空间</div>
              </div>
              
              <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-red-600 font-medium mb-1">谈判底线</div>
                <div className="text-2xl font-bold text-red-800 dark:text-red-200">
                  {getBottomLine().toFixed(1)} 万元
                </div>
                <div className="text-sm text-red-600 mt-1">不可突破的底线</div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                <AlertCircle className="w-4 h-4" />
                <span className="font-medium">底线说明</span>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                谈判底线 = 最佳BATNA净价值 - 安全缓冲。任何低于此底线的协议都不如你的最佳替代方案。
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 添加/编辑表单 */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingId ? '编辑 BATNA 方案' : '添加 BATNA 方案'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">方案名称</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="例如：延期一年结婚"
              />
            </div>

            <div>
              <Label htmlFor="description">详细描述</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="描述这个替代方案的具体内容"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gain">收益 (万元)</Label>
                <Input
                  id="gain"
                  type="number"
                  value={formData.gain}
                  onChange={(e) => setFormData({ ...formData, gain: parseFloat(e.target.value) || 0 })}
                  placeholder="预期获得的价值"
                  step="0.1"
                />
              </div>
              <div>
                <Label htmlFor="directCost">直接成本 (万元)</Label>
                <Input
                  id="directCost"
                  type="number"
                  value={formData.directCost}
                  onChange={(e) => setFormData({ ...formData, directCost: parseFloat(e.target.value) || 0 })}
                  placeholder="明确的支出费用"
                  step="0.1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="riskPenalty">风险损失 (万元)</Label>
                <Input
                  id="riskPenalty"
                  type="number"
                  value={formData.riskPenalty}
                  onChange={(e) => setFormData({ ...formData, riskPenalty: parseFloat(e.target.value) || 0 })}
                  placeholder="可能的风险成本"
                  step="0.1"
                />
              </div>
              <div>
                <Label htmlFor="switchCost">转换成本 (万元)</Label>
                <Input
                  id="switchCost"
                  type="number"
                  value={formData.switchCost}
                  onChange={(e) => setFormData({ ...formData, switchCost: parseFloat(e.target.value) || 0 })}
                  placeholder="切换方案的成本"
                  step="0.1"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSubmit}>
                {editingId ? '更新方案' : '添加方案'}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                取消
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 添加新方案按钮 */}
      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          className="w-full"
          variant="outline"
        >
          <Plus className="w-4 h-4 mr-2" />
          添加 BATNA 方案
        </Button>
      )}

      {/* 完成提示 */}
      {bestBatna && (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
            <Calculator className="w-5 h-5" />
            <span className="font-semibold">BATNA 计算完成！</span>
          </div>
          <p className="text-green-700 dark:text-green-300 text-sm mt-1">
            最佳方案：{bestBatna.name}，谈判底线：{getBottomLine().toFixed(1)} 万元。
            点击"下一步"继续分析对方情况。
          </p>
        </div>
      )}
    </div>
  )
}