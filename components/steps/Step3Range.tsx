'use client'

import { useNegotiationStore } from '@/lib/store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, TrendingUp } from 'lucide-react'

export default function Step3Range() {
  const { issues } = useNegotiationStore()

  return (
    <div className="space-y-6">
      {/* 说明 */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          价值区间分析
        </h3>
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          基于你在第二步设定的议题价值区间，这里展示每个议题的谈判空间。
          理想值到底线之间的区间就是你的让步空间。
        </p>
      </div>

      {/* 议题区间展示 */}
      {issues.length > 0 ? (
        <div className="space-y-4">
          {issues.map((issue) => (
            <Card key={issue.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="w-5 h-5 text-blue-600" />
                  {issue.name}
                </CardTitle>
                <CardDescription>
                  重要性: {issue.importance}/10 | 单位: {issue.unit}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* 数值显示 */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                      <div className="text-sm text-green-600 dark:text-green-400">理想值</div>
                      <div className="text-lg font-bold text-green-800 dark:text-green-200">
                        {issue.idealValue} {issue.unit}
                      </div>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                      <div className="text-sm text-yellow-600 dark:text-yellow-400">可接受值</div>
                      <div className="text-lg font-bold text-yellow-800 dark:text-yellow-200">
                        {issue.acceptableValue} {issue.unit}
                      </div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                      <div className="text-sm text-red-600 dark:text-red-400">底线值</div>
                      <div className="text-lg font-bold text-red-800 dark:text-red-200">
                        {issue.bottomLine} {issue.unit}
                      </div>
                    </div>
                  </div>

                  {/* 可视化区间条 */}
                  <div className="relative">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400"
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>理想</span>
                      <span>可接受</span>
                      <span>底线</span>
                    </div>
                  </div>

                  {/* 让步空间分析 */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">让步空间分析</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <p>• 总让步空间: {Math.abs(issue.idealValue - issue.bottomLine)} {issue.unit}</p>
                      <p>• 理想到可接受: {Math.abs(issue.idealValue - issue.acceptableValue)} {issue.unit}</p>
                      <p>• 可接受到底线: {Math.abs(issue.acceptableValue - issue.bottomLine)} {issue.unit}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <BarChart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
              暂无议题数据
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              请先在第二步中添加议题并设定价值区间
            </p>
          </CardContent>
        </Card>
      )}

      {/* 完成提示 */}
      {issues.length > 0 && (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
            <BarChart className="w-5 h-5" />
            <span className="font-semibold">价值区间分析完成！</span>
          </div>
          <p className="text-green-700 dark:text-green-300 text-sm mt-1">
            已分析 {issues.length} 个议题的价值区间。点击"下一步"继续计算BATNA方案。
          </p>
        </div>
      )}
    </div>
  )
}