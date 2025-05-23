'use client'

import { useNegotiationStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Target, Clock, Zap } from 'lucide-react'

export default function Step6Strategy() {
  const { strategy, updateStrategy } = useNegotiationStore()

  const approachOptions = [
    {
      value: 'collaborative',
      label: '合作型',
      description: '寻求双赢解决方案，注重长期关系',
      color: 'bg-green-50 border-green-200 text-green-800'
    },
    {
      value: 'competitive',
      label: '竞争型',
      description: '追求自身利益最大化，适合一次性谈判',
      color: 'bg-red-50 border-red-200 text-red-800'
    },
    {
      value: 'accommodating',
      label: '迁就型',
      description: '优先维护关系，适当让步',
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    }
  ]

  const concessionOptions = [
    {
      value: 'linear',
      label: '线性让步',
      description: '每轮等量让步，节奏稳定',
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    {
      value: 'exponential',
      label: '递减让步',
      description: '初期大幅让步，后期坚持底线',
      color: 'bg-orange-50 border-orange-200 text-orange-800'
    },
    {
      value: 'step',
      label: '阶梯让步',
      description: '分阶段让步，每阶段内保持坚持',
      color: 'bg-purple-50 border-purple-200 text-purple-800'
    }
  ]

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          谈判策略制定
        </h3>
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          基于前面的分析，制定你的整体谈判策略。包括谈判方式、让步模式和时间安排。
        </p>
      </div>

      {/* 谈判方式选择 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            谈判方式
          </CardTitle>
          <CardDescription>
            选择最适合你情况的谈判方式
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {approachOptions.map((option) => (
              <div
                key={option.value}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  strategy.approach === option.value
                    ? option.color
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => updateStrategy({ approach: option.value as any })}
              >
                <div className="font-semibold mb-2">{option.label}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {option.description}
                </div>
                {strategy.approach === option.value && (
                  <Badge className="mt-2 bg-blue-600">已选择</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 让步模式选择 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-600" />
            让步模式
          </CardTitle>
          <CardDescription>
            选择你的让步策略和节奏
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {concessionOptions.map((option) => (
              <div
                key={option.value}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  strategy.concessionPattern === option.value
                    ? option.color
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => updateStrategy({ concessionPattern: option.value as any })}
              >
                <div className="font-semibold mb-2">{option.label}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {option.description}
                </div>
                {strategy.concessionPattern === option.value && (
                  <Badge className="mt-2 bg-orange-600">已选择</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 时间策略 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-600" />
            时间策略
          </CardTitle>
          <CardDescription>
            制定你的时间安排和节奏控制策略
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="timeStrategy">时间策略描述</Label>
            <Textarea
              id="timeStrategy"
              value={strategy.timeStrategy}
              onChange={(e) => updateStrategy({ timeStrategy: e.target.value })}
              placeholder="例如：分3次谈判，每次间隔1周，给双方思考时间。第一次主要沟通立场，第二次具体讨论条件，第三次最终确定。"
              className="min-h-[100px] mt-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* 策略总结 */}
      <Card>
        <CardHeader>
          <CardTitle>策略总结</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                  谈判方式
                </div>
                <div className="text-lg">
                  {approachOptions.find(opt => opt.value === strategy.approach)?.label || '未选择'}
                </div>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="font-semibold text-orange-800 dark:text-orange-200 mb-1">
                  让步模式
                </div>
                <div className="text-lg">
                  {concessionOptions.find(opt => opt.value === strategy.concessionPattern)?.label || '未选择'}
                </div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="font-semibold text-green-800 dark:text-green-200 mb-1">
                  时间安排
                </div>
                <div className="text-sm">
                  {strategy.timeStrategy ? '已制定' : '待完善'}
                </div>
              </div>
            </div>

            {/* 策略建议 */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">策略建议</h4>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                {strategy.approach === 'collaborative' && (
                  <p>• 合作型谈判：强调共同利益，寻找创造性解决方案，保持开放沟通</p>
                )}
                {strategy.approach === 'competitive' && (
                  <p>• 竞争型谈判：明确底线，坚持立场，准备好替代方案</p>
                )}
                {strategy.approach === 'accommodating' && (
                  <p>• 迁就型谈判：优先考虑关系维护，适当让步，寻求长期合作</p>
                )}
                
                {strategy.concessionPattern === 'linear' && (
                  <p>• 线性让步：保持稳定节奏，避免过早暴露底线</p>
                )}
                {strategy.concessionPattern === 'exponential' && (
                  <p>• 递减让步：初期展现诚意，后期坚持原则</p>
                )}
                {strategy.concessionPattern === 'step' && (
                  <p>• 阶梯让步：分阶段推进，每个阶段都要有明确目标</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 完成提示 */}
      {strategy.approach && strategy.concessionPattern && strategy.timeStrategy && (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
            <Target className="w-5 h-5" />
            <span className="font-semibold">谈判策略制定完成！</span>
          </div>
          <p className="text-green-700 dark:text-green-300 text-sm mt-1">
            已确定谈判方式、让步模式和时间策略。点击"下一步"继续准备开场锚点。
          </p>
        </div>
      )}
    </div>
  )
}