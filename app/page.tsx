'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Target, Calculator, BarChart3, Users, FileText, Download, Lightbulb } from 'lucide-react'
import { useNegotiationStore } from '@/lib/store'
import Image from 'next/image'

export default function HomePage() {
  const router = useRouter()
  const { loadExample } = useNegotiationStore()

  const handleLoadExample = (type: 'male' | 'female') => {
    loadExample(type)
    router.push('/step/1')
  }

  const features = [
    { icon: Target, title: '目标设定', description: '明确谈判目标和期望结果' },
    { icon: Calculator, title: 'BATNA计算', description: '计算最佳替代方案价值' },
    { icon: BarChart3, title: '区间分析', description: '可视化价值区间和让步空间' },
    { icon: Users, title: '对方画像', description: '分析关键人物和影响因素' },
    { icon: FileText, title: '脚本生成', description: '自动生成谈判脚本和策略' },
    { icon: Download, title: '报告导出', description: '生成专业的准备报告' },
  ]

  const steps = [
    '设定谈判目标',
    '识别关键议题',
    '确定价值区间',
    '计算BATNA方案',
    '分析对方情况',
    '制定谈判策略',
    '准备开场锚点',
    '生成完整报告'
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 头部介绍 */}
      <div className="text-center mb-12">
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          彩礼谈判 8 步战前准备
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          30分钟完成专业谈判准备，生成可分享的策略报告
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span>完全离线使用</span>
          </div>
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span>数据本地保存</span>
          </div>
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span>专业报告导出</span>
          </div>
        </div>
        <Button 
          size="lg" 
          onClick={() => router.push('/step/1')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
        >
          开始准备谈判
        </Button>
      </div>

      {/* 案例介绍 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">真实案例演示</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-700 dark:text-green-300">
                📋 小李案例 (男方视角)
              </CardTitle>
              <CardDescription>
                深圳IT工程师的完整谈判准备
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div><strong>背景：</strong>深圳IT工程师，预算有限</div>
                <div><strong>目标：</strong>总成本≤20万，3个月内完婚</div>
                <div><strong>挑战：</strong>女方期待≥18万彩礼</div>
                <div><strong>策略：</strong>8步科学准备，数据驱动谈判</div>
              </div>
              <Button
                onClick={() => handleLoadExample('male')}
                className="w-full mt-4 bg-green-600 hover:bg-green-700"
              >
                体验完整案例
              </Button>
            </CardContent>
          </Card>

          <Card className="border-pink-200 bg-pink-50 dark:bg-pink-900/20">
            <CardHeader>
              <CardTitle className="text-pink-700 dark:text-pink-300">
                📋 女方案例 (女方视角)
              </CardTitle>
              <CardDescription>
                广东教师家庭的期望与考量
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div><strong>背景：</strong>广东教师，父母重视体面</div>
                <div><strong>期望：</strong>彩礼≥18万，婚礼风光体面</div>
                <div><strong>考量：</strong>安全感与家庭声誉</div>
                <div><strong>策略：</strong>平衡期望与现实的谈判准备</div>
              </div>
              <Button
                onClick={() => handleLoadExample('female')}
                className="w-full mt-4 bg-pink-600 hover:bg-pink-700"
              >
                体验女方视角
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 核心功能 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">核心功能</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 8步流程 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">8步准备流程</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <span className="font-medium">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 快速开始 */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 mb-8">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Lightbulb className="w-8 h-8 text-yellow-500" />
            <CardTitle>快速开始提示</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li>• 准备好相关资料：家庭情况、经济状况、当地习俗等</li>
            <li>• 思考你的底线和理想结果</li>
            <li>• 了解对方的基本情况和可能的考虑因素</li>
            <li>• 整个过程大约需要20-30分钟</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button
              onClick={() => router.push('/step/1')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              开始第一步
            </Button>
            <Button
              variant="outline"
              onClick={() => handleLoadExample('male')}
              className="border-green-500 text-green-600 hover:bg-green-50"
            >
              📋 加载小李案例 (男方视角)
            </Button>
            <Button
              variant="outline"
              onClick={() => handleLoadExample('female')}
              className="border-pink-500 text-pink-600 hover:bg-pink-50"
            >
              📋 加载女方案例
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 底部品牌信息 - 完全沉底 */}
      <div className="mt-8 p-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-4xl mx-auto">
          
          {/* 左侧：工具信息和抖音头像 */}
          <div className="text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                <Image
                  src="/assets/douyin_head.jpg"
                  alt="抖音头像"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">🎯 彩礼谈判准备工具</h3>
              </div>
            </div>
            <p className="text-sm opacity-90 mb-2">🌐 官网：zaoqi.icu</p>
            <p className="text-sm opacity-90 mb-2">📱 抖音：早起就会死</p>
            <p className="text-sm opacity-90 mb-2">🆔 抖音号：36095284700</p>
            <p className="text-xs opacity-80">科学谈判 · 数据驱动 · 专业分析</p>
          </div>
          
          {/* 中间：抖音二维码 - 放大一倍 */}
          <div className="text-center">
            <div
              className="w-48 h-48 bg-white rounded-lg p-4 mx-auto mb-3 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => window.open('https://v.douyin.com/U_jwEBNoSb8/', '_blank')}
            >
              <Image
                src="/assets/douyin_qr_code.jpg"
                alt="抖音二维码"
                width={160}
                height={160}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <p className="text-sm opacity-90 mb-2">扫码关注抖音</p>
            <p className="text-sm opacity-90 mb-1">早起就会死</p>
            <p className="text-sm opacity-80">36095284700</p>
          </div>
          
          {/* 右侧：更多信息和抖音符号 */}
          <div className="text-right">
            <div className="flex items-center justify-end gap-3 mb-4">
              <h4 className="text-lg font-bold">💡 更多工具</h4>
              <div
                className="text-4xl cursor-pointer hover:scale-110 transition-transform"
                onClick={() => window.open('https://v.douyin.com/U_jwEBNoSb8/', '_blank')}
                title="点击访问抖音主页"
              >
                🎵
              </div>
            </div>
            <p className="text-sm opacity-90 mb-1">• 谈判策略分析</p>
            <p className="text-sm opacity-90 mb-1">• 数据可视化</p>
            <p className="text-sm opacity-90 mb-1">• 专业报告生成</p>
            <p className="text-xs opacity-80 mt-3">
              访问
              <a
                href="https://zaoqi.icu"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-yellow-300 transition-colors"
              >
                zaoqi.icu
              </a>
              了解更多
            </p>
          </div>
          
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/30 text-xs opacity-80">
          本工具完全免费使用 | 数据仅保存在本地浏览器，确保隐私安全 | © zaoqi.icu
        </div>
      </div>
    </div>
  )
}