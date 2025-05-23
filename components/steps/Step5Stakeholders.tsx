'use client'

import { useState } from 'react'
import { useNegotiationStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Plus, X, Users, Heart, Brain } from 'lucide-react'

export default function Step5Stakeholders() {
  const { stakeholders, addStakeholder, updateStakeholder, removeStakeholder } = useNegotiationStore()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    influence: 5,
    support: 5,
    painPoints: [] as string[],
    interests: [] as string[]
  })
  const [newPainPoint, setNewPainPoint] = useState('')
  const [newInterest, setNewInterest] = useState('')

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      influence: 5,
      support: 5,
      painPoints: [],
      interests: []
    })
    setEditingId(null)
    setShowForm(false)
    setNewPainPoint('')
    setNewInterest('')
  }

  const handleSubmit = () => {
    if (!formData.name.trim()) return

    if (editingId) {
      updateStakeholder(editingId, formData)
    } else {
      addStakeholder(formData)
    }
    resetForm()
  }

  const handleEdit = (stakeholder: any) => {
    setFormData({
      name: stakeholder.name,
      role: stakeholder.role,
      influence: stakeholder.influence,
      support: stakeholder.support,
      painPoints: [...stakeholder.painPoints],
      interests: [...stakeholder.interests]
    })
    setEditingId(stakeholder.id)
    setShowForm(true)
  }

  const addPainPoint = () => {
    if (newPainPoint.trim()) {
      setFormData({
        ...formData,
        painPoints: [...formData.painPoints, newPainPoint.trim()]
      })
      setNewPainPoint('')
    }
  }

  const removePainPoint = (index: number) => {
    setFormData({
      ...formData,
      painPoints: formData.painPoints.filter((_, i) => i !== index)
    })
  }

  const addInterest = () => {
    if (newInterest.trim()) {
      setFormData({
        ...formData,
        interests: [...formData.interests, newInterest.trim()]
      })
      setNewInterest('')
    }
  }

  const removeInterest = (index: number) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((_, i) => i !== index)
    })
  }

  const getInfluenceColor = (influence: number) => {
    if (influence >= 8) return 'text-red-600 bg-red-50 dark:bg-red-900/20'
    if (influence >= 6) return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20'
    if (influence >= 4) return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
    return 'text-green-600 bg-green-50 dark:bg-green-900/20'
  }

  const getSupportColor = (support: number) => {
    if (support >= 8) return 'text-green-600 bg-green-50 dark:bg-green-900/20'
    if (support >= 6) return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
    if (support >= 4) return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
    return 'text-red-600 bg-red-50 dark:bg-red-900/20'
  }

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          利益相关者分析
        </h3>
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          识别所有可能影响谈判结果的关键人物，分析他们的影响力、支持度、痛点和利益诉求。
          这将帮助你制定针对性的沟通策略。
        </p>
      </div>

      {/* 分析维度说明 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            分析维度
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium text-orange-600 mb-2">影响力 (1-10)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                这个人对谈判结果的影响程度。10分表示决定性影响，1分表示几乎无影响。
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium text-green-600 mb-2">支持度 (1-10)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                这个人对你的立场的支持程度。10分表示强烈支持，1分表示强烈反对。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 已添加的利益相关者 */}
      {stakeholders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>关键人物分析</CardTitle>
            <CardDescription>
              已识别的利益相关者及其特征分析
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stakeholders.map((stakeholder) => (
                <div key={stakeholder.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{stakeholder.name}</h4>
                        <Badge variant="secondary">{stakeholder.role}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className={`text-center p-2 rounded ${getInfluenceColor(stakeholder.influence)}`}>
                          <div className="font-medium">影响力</div>
                          <div className="text-lg font-bold">{stakeholder.influence}/10</div>
                        </div>
                        <div className={`text-center p-2 rounded ${getSupportColor(stakeholder.support)}`}>
                          <div className="font-medium">支持度</div>
                          <div className="text-lg font-bold">{stakeholder.support}/10</div>
                        </div>
                      </div>

                      {stakeholder.painPoints.length > 0 && (
                        <div className="mb-2">
                          <div className="text-sm font-medium text-red-600 mb-1">痛点：</div>
                          <div className="flex flex-wrap gap-1">
                            {stakeholder.painPoints.map((point, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {point}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {stakeholder.interests.length > 0 && (
                        <div>
                          <div className="text-sm font-medium text-green-600 mb-1">利益诉求：</div>
                          <div className="flex flex-wrap gap-1">
                            {stakeholder.interests.map((interest, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(stakeholder)}
                      >
                        编辑
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeStakeholder(stakeholder.id)}
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
              {editingId ? '编辑利益相关者' : '添加利益相关者'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">姓名</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="例如：张父亲"
                />
              </div>
              <div>
                <Label htmlFor="role">角色关系</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="例如：男方父亲"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="influence">影响力 (1-10)</Label>
                <Input
                  id="influence"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.influence}
                  onChange={(e) => setFormData({ ...formData, influence: parseInt(e.target.value) || 1 })}
                />
              </div>
              <div>
                <Label htmlFor="support">支持度 (1-10)</Label>
                <Input
                  id="support"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.support}
                  onChange={(e) => setFormData({ ...formData, support: parseInt(e.target.value) || 1 })}
                />
              </div>
            </div>

            <div>
              <Label>痛点 (担心的问题)</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newPainPoint}
                  onChange={(e) => setNewPainPoint(e.target.value)}
                  placeholder="例如：担心经济负担过重"
                  onKeyPress={(e) => e.key === 'Enter' && addPainPoint()}
                />
                <Button onClick={addPainPoint} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.painPoints.map((point, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {point}
                    <button
                      onClick={() => removePainPoint(index)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>利益诉求 (希望得到什么)</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="例如：希望女儿得到尊重"
                  onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                />
                <Button onClick={addInterest} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.interests.map((interest, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {interest}
                    <button
                      onClick={() => removeInterest(index)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSubmit}>
                {editingId ? '更新' : '添加'}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                取消
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 添加新人物按钮 */}
      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          className="w-full"
          variant="outline"
        >
          <Plus className="w-4 h-4 mr-2" />
          添加利益相关者
        </Button>
      )}

      {/* 完成提示 */}
      {stakeholders.length > 0 && (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
            <Users className="w-5 h-5" />
            <span className="font-semibold">利益相关者分析完成！</span>
          </div>
          <p className="text-green-700 dark:text-green-300 text-sm mt-1">
            已分析 {stakeholders.length} 个关键人物。点击"下一步"继续制定谈判策略。
          </p>
        </div>
      )}
    </div>
  )
}