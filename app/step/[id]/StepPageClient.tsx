'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useNegotiationStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, ArrowRight } from 'lucide-react'

// 导入各步骤组件
import Step1Goal from '@/components/steps/Step1Goal'
import Step2Issues from '@/components/steps/Step2Issues'
import Step3Range from '@/components/steps/Step3Range'
import Step4Batna from '@/components/steps/Step4Batna'
import Step5Stakeholders from '@/components/steps/Step5Stakeholders'
import Step6Strategy from '@/components/steps/Step6Strategy'
import Step7Anchor from '@/components/steps/Step7Anchor'
import Step8Review from '@/components/steps/Step8Review'

const stepComponents = {
  1: Step1Goal,
  2: Step2Issues,
  3: Step3Range,
  4: Step4Batna,
  5: Step5Stakeholders,
  6: Step6Strategy,
  7: Step7Anchor,
  8: Step8Review,
}

const stepTitles = {
  1: '设定谈判目标',
  2: '识别关键议题',
  3: '确定价值区间',
  4: '计算BATNA方案',
  5: '分析对方情况',
  6: '制定谈判策略',
  7: '准备开场锚点',
  8: '生成完整报告',
}

interface StepPageClientProps {
  id: string
}

export default function StepPageClient({ id }: StepPageClientProps) {
  const router = useRouter()
  const currentStep = parseInt(id)
  const { setCurrentStep, metadata } = useNegotiationStore()

  useEffect(() => {
    if (currentStep >= 1 && currentStep <= 8) {
      setCurrentStep(currentStep)
    } else {
      router.push('/step/1')
    }
  }, [currentStep, setCurrentStep, router])

  const StepComponent = stepComponents[currentStep as keyof typeof stepComponents]

  const handlePrevious = () => {
    if (currentStep > 1) {
      router.push(`/step/${currentStep - 1}`)
    } else {
      router.push('/')
    }
  }

  const handleNext = () => {
    if (currentStep < 8) {
      router.push(`/step/${currentStep + 1}`)
    }
  }

  if (!StepComponent) {
    return <div>页面不存在</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* 进度条 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              第 {currentStep} 步：{stepTitles[currentStep as keyof typeof stepTitles]}
            </h1>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {currentStep} / 8
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 8) * 100}%` }}
            />
          </div>
          
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {Object.entries(stepTitles).map(([step, title]) => (
              <div 
                key={step}
                className={`text-center ${parseInt(step) <= currentStep ? 'text-blue-600 font-medium' : ''}`}
              >
                {title}
              </div>
            ))}
          </div>
        </div>

        {/* 主要内容 */}
        <Card className="mb-8" id="export-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                {currentStep}
              </div>
              {stepTitles[currentStep as keyof typeof stepTitles]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StepComponent />
          </CardContent>
        </Card>

        {/* 导航按钮 */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {currentStep === 1 ? '返回首页' : '上一步'}
          </Button>

          {currentStep < 8 && (
            <Button
              onClick={handleNext}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              下一步
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* 自动保存提示 */}
        <div className="mt-4 text-center text-sm text-gray-500">
          数据已自动保存到本地浏览器
          <br />
          最后更新：{new Date(metadata.updatedAt).toLocaleString('zh-CN')}
        </div>
      </div>
    </div>
  )
}