'use client'

import { useState } from 'react'
import { useNegotiationStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Plus, X, Target, Clock, AlertCircle } from 'lucide-react'

export default function Step1Goal() {
  const { goals, updateGoals, loadExample } = useNegotiationStore()
  const [newSecondary, setNewSecondary] = useState('')
  const [newConstraint, setNewConstraint] = useState('')

  const handlePrimaryChange = (value: string) => {
    updateGoals({ primary: value })
  }

  const handleTimelineChange = (value: string) => {
    updateGoals({ timeline: value })
  }

  const addSecondaryGoal = () => {
    if (newSecondary.trim()) {
      updateGoals({ 
        secondary: [...goals.secondary, newSecondary.trim()] 
      })
      setNewSecondary('')
    }
  }

  const removeSecondaryGoal = (index: number) => {
    updateGoals({ 
      secondary: goals.secondary.filter((_, i) => i !== index) 
    })
  }

  const addConstraint = () => {
    if (newConstraint.trim()) {
      updateGoals({ 
        constraints: [...goals.constraints, newConstraint.trim()] 
      })
      setNewConstraint('')
    }
  }

  const removeConstraint = (index: number) => {
    updateGoals({ 
      constraints: goals.constraints.filter((_, i) => i !== index) 
    })
  }

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          为什么要设定明确的目标？
        </h3>
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          明确的目标是成功谈判的基础。主要目标帮助你保持专注，次要目标确保全面考虑，
          时间框架创造紧迫感，约束条件帮助你制定现实可行的策略。
        </p>
      </div>

      {/* 快速示例 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">快速开始</CardTitle>
          <CardDescription>
            选择一个示例来快速填充表单，然后根据你的实际情况进行调整
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={() => loadExample('male')}
              className="flex-1"
            >
              加载男方示例
            </Button>
            <Button 
              variant="outline" 
              onClick={() => loadExample('female')}
              className="flex-1"
            >
              加载女方示例
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 主要目标 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            主要目标
          </CardTitle>
          <CardDescription>
            你在这次谈判中最重要的目标是什么？要具体、可衡量。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="例如：以双方都能接受的彩礼金额达成婚约，确保婚礼能够顺利进行"
            value={goals.primary}
            onChange={(e) => handlePrimaryChange(e.target.value)}
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>

      {/* 次要目标 */}
      <Card>
        <CardHeader>
          <CardTitle>次要目标</CardTitle>
          <CardDescription>
            除了主要目标外，你还希望在谈判中实现什么？
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="输入次要目标"
              value={newSecondary}
              onChange={(e) => setNewSecondary(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSecondaryGoal()}
            />
            <Button onClick={addSecondaryGoal} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {goals.secondary.map((goal, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                <span className="flex-1 text-sm">{goal}</span>
                <button
                  onClick={() => removeSecondaryGoal(index)}
                  className="ml-2 p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 时间框架 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-600" />
            时间框架
          </CardTitle>
          <CardDescription>
            你希望在什么时间内完成这次谈判？
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="例如：3个月内确定彩礼金额和婚礼安排"
            value={goals.timeline}
            onChange={(e) => handleTimelineChange(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* 约束条件 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            约束条件
          </CardTitle>
          <CardDescription>
            有哪些因素会限制你的谈判选择？
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="例如：家庭经济承受能力、当地习俗要求"
              value={newConstraint}
              onChange={(e) => setNewConstraint(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addConstraint()}
            />
            <Button onClick={addConstraint} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {goals.constraints.map((constraint, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                <span className="flex-1 text-sm">{constraint}</span>
                <button
                  onClick={() => removeConstraint(index)}
                  className="ml-2 p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 完成提示 */}
      {goals.primary && goals.timeline && (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
            <Target className="w-5 h-5" />
            <span className="font-semibold">目标设定完成！</span>
          </div>
          <p className="text-green-700 dark:text-green-300 text-sm mt-1">
            你已经设定了明确的谈判目标。点击"下一步"继续识别关键议题。
          </p>
        </div>
      )}
    </div>
  )
}