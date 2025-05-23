'use client'

import { useState } from 'react'
import { useNegotiationStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Plus, X, Edit, List, DollarSign, Home, Calendar, Gift } from 'lucide-react'

export default function Step2Issues() {
  const { issues, addIssue, updateIssue, removeIssue } = useNegotiationStore()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    importance: 5,
    idealValue: 0,
    acceptableValue: 0,
    bottomLine: 0,
    unit: '万元'
  })

  const commonIssues = [
    { name: '彩礼金额', unit: '万元', icon: DollarSign, description: '彩礼的具体金额' },
    { name: '房产安排', unit: '套', icon: Home, description: '婚房的购买或准备' },
    { name: '婚礼规模', unit: '桌', icon: Calendar, description: '婚礼宴席的规模' },
    { name: '三金首饰', unit: '套', icon: Gift, description: '传统三金首饰' },
  ]

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      importance: 5,
      idealValue: 0,
      acceptableValue: 0,
      bottomLine: 0,
      unit: '万元'
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleSubmit = () => {
    if (!formData.name.trim()) return

    if (editingId) {
      updateIssue(editingId, formData)
    } else {
      addIssue(formData)
    }
    resetForm()
  }

  const handleEdit = (issue: any) => {
    setFormData({
      name: issue.name,
      description: issue.description,
      importance: issue.importance,
      idealValue: issue.idealValue,
      acceptableValue: issue.acceptableValue,
      bottomLine: issue.bottomLine,
      unit: issue.unit
    })
    setEditingId(issue.id)
    setShowForm(true)
  }

  const addCommonIssue = (commonIssue: any) => {
    setFormData({
      name: commonIssue.name,
      description: commonIssue.description,
      importance: 7,
      idealValue: 0,
      acceptableValue: 0,
      bottomLine: 0,
      unit: commonIssue.unit
    })
    setShowForm(true)
  }

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          识别关键议题
        </h3>
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          列出所有需要在谈判中讨论的重要议题。每个议题都需要设定重要性级别和价值区间，
          这将帮助你在谈判中做出明智的取舍决策。
        </p>
      </div>

      {/* 常见议题快速添加 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <List className="w-5 h-5 text-green-600" />
            常见议题
          </CardTitle>
          <CardDescription>
            点击下方常见议题快速添加，然后设定具体的价值区间
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {commonIssues.map((issue, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => addCommonIssue(issue)}
              >
                <issue.icon className="w-6 h-6 text-blue-600" />
                <span className="font-medium">{issue.name}</span>
                <span className="text-xs text-gray-500">{issue.description}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 已添加的议题列表 */}
      {issues.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>已识别的议题</CardTitle>
            <CardDescription>
              点击编辑按钮来设定每个议题的具体价值区间
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {issues.map((issue) => (
                <div key={issue.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{issue.name}</h4>
                        <Badge variant="secondary">
                          重要性: {issue.importance}/10
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {issue.description}
                      </p>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">理想值:</span>
                          <span className="ml-1 font-medium">
                            {issue.idealValue} {issue.unit}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">可接受:</span>
                          <span className="ml-1 font-medium">
                            {issue.acceptableValue} {issue.unit}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">底线:</span>
                          <span className="ml-1 font-medium">
                            {issue.bottomLine} {issue.unit}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(issue)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeIssue(issue.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 添加/编辑表单 */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingId ? '编辑议题' : '添加新议题'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">议题名称</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="例如：彩礼金额"
              />
            </div>

            <div>
              <Label htmlFor="description">详细描述</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="描述这个议题的具体内容和重要性"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="importance">重要性 (1-10)</Label>
                <Input
                  id="importance"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.importance}
                  onChange={(e) => setFormData({ ...formData, importance: parseInt(e.target.value) || 1 })}
                />
              </div>
              <div>
                <Label htmlFor="unit">单位</Label>
                <Input
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="万元、套、桌等"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="idealValue">理想值</Label>
                <Input
                  id="idealValue"
                  type="number"
                  value={formData.idealValue}
                  onChange={(e) => setFormData({ ...formData, idealValue: parseFloat(e.target.value) || 0 })}
                  placeholder="最理想的结果"
                />
              </div>
              <div>
                <Label htmlFor="acceptableValue">可接受值</Label>
                <Input
                  id="acceptableValue"
                  type="number"
                  value={formData.acceptableValue}
                  onChange={(e) => setFormData({ ...formData, acceptableValue: parseFloat(e.target.value) || 0 })}
                  placeholder="可以接受的结果"
                />
              </div>
              <div>
                <Label htmlFor="bottomLine">底线值</Label>
                <Input
                  id="bottomLine"
                  type="number"
                  value={formData.bottomLine}
                  onChange={(e) => setFormData({ ...formData, bottomLine: parseFloat(e.target.value) || 0 })}
                  placeholder="最低可接受的结果"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSubmit}>
                {editingId ? '更新议题' : '添加议题'}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                取消
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 添加新议题按钮 */}
      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          className="w-full"
          variant="outline"
        >
          <Plus className="w-4 h-4 mr-2" />
          添加自定义议题
        </Button>
      )}

      {/* 完成提示 */}
      {issues.length > 0 && (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
            <List className="w-5 h-5" />
            <span className="font-semibold">议题识别完成！</span>
          </div>
          <p className="text-green-700 dark:text-green-300 text-sm mt-1">
            已识别 {issues.length} 个关键议题。点击"下一步"继续确定价值区间。
          </p>
        </div>
      )}
    </div>
  )
}