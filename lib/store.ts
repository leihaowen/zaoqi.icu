import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// 数据类型定义
export interface NegotiationGoal {
  primary: string
  secondary: string[]
  timeline: string
  constraints: string[]
}

export interface Issue {
  id: string
  name: string
  importance: number // 1-10
  idealValue: number
  acceptableValue: number
  bottomLine: number
  unit: string
  description: string
}

export interface BatnaOption {
  id: string
  name: string
  description: string
  gain: number
  directCost: number
  riskPenalty: number
  switchCost: number
  netValue?: number
}

export interface Stakeholder {
  id: string
  name: string
  role: string
  influence: number // 1-10
  support: number // 1-10
  painPoints: string[]
  interests: string[]
}

export interface AnchorStrategy {
  type: 'aggressive' | 'moderate' | 'conservative'
  firstOffer: Record<string, number>
  justification: string[]
}

export interface NegotiationData {
  // Step 1: 目标设定
  goals: NegotiationGoal

  // Step 2: 议题识别
  issues: Issue[]

  // Step 3: 价值区间
  // 已包含在 issues 中

  // Step 4: BATNA计算
  batnaOptions: BatnaOption[]
  bestBatna?: BatnaOption
  bottomLineBuffer: number

  // Step 5: 对方画像
  stakeholders: Stakeholder[]

  // Step 6: 谈判策略
  strategy: {
    approach: 'collaborative' | 'competitive' | 'accommodating'
    concessionPattern: 'linear' | 'exponential' | 'step'
    timeStrategy: string
  }

  // Step 7: 锚点策略
  anchorStrategy: AnchorStrategy

  // Step 8: 完整报告
  reportSettings: {
    includeCharts: boolean
    includeScript: boolean
    theme: 'light' | 'dark'
    format: 'png' | 'pdf'
  }

  // 元数据
  metadata: {
    createdAt: string
    updatedAt: string
    currentStep: number
    isComplete: boolean
  }
}

// 初始状态
const initialState: NegotiationData = {
  goals: {
    primary: '',
    secondary: [],
    timeline: '',
    constraints: []
  },
  issues: [],
  batnaOptions: [],
  bottomLineBuffer: 0,
  stakeholders: [],
  strategy: {
    approach: 'collaborative',
    concessionPattern: 'linear',
    timeStrategy: ''
  },
  anchorStrategy: {
    type: 'moderate',
    firstOffer: {},
    justification: []
  },
  reportSettings: {
    includeCharts: true,
    includeScript: true,
    theme: 'light',
    format: 'pdf'
  },
  metadata: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    currentStep: 1,
    isComplete: false
  }
}

// Store 接口
interface NegotiationStore extends NegotiationData {
  // 通用操作
  updateMetadata: () => void
  setCurrentStep: (step: number) => void
  resetData: () => void

  // Step 1: 目标设定
  updateGoals: (goals: Partial<NegotiationGoal>) => void

  // Step 2: 议题管理
  addIssue: (issue: Omit<Issue, 'id'>) => void
  updateIssue: (id: string, updates: Partial<Issue>) => void
  removeIssue: (id: string) => void

  // Step 4: BATNA管理
  addBatnaOption: (option: Omit<BatnaOption, 'id' | 'netValue'>) => void
  updateBatnaOption: (id: string, updates: Partial<BatnaOption>) => void
  removeBatnaOption: (id: string) => void
  calculateBestBatna: () => void
  updateBottomLineBuffer: (buffer: number) => void

  // Step 5: 利益相关者管理
  addStakeholder: (stakeholder: Omit<Stakeholder, 'id'>) => void
  updateStakeholder: (id: string, updates: Partial<Stakeholder>) => void
  removeStakeholder: (id: string) => void

  // Step 6: 策略设定
  updateStrategy: (strategy: Partial<NegotiationData['strategy']>) => void

  // Step 7: 锚点策略
  updateAnchorStrategy: (anchor: Partial<AnchorStrategy>) => void

  // Step 8: 报告设置
  updateReportSettings: (settings: Partial<NegotiationData['reportSettings']>) => void

  // 示例数据加载
  loadExample: (type: 'male' | 'female') => void
}

// 创建 Store
export const useNegotiationStore = create<NegotiationStore>()(
  persist(
    immer((set, get) => ({
      ...initialState,

      updateMetadata: () => set((state) => {
        state.metadata = {
          ...state.metadata,
          updatedAt: new Date().toISOString()
        }
      }),

      setCurrentStep: (step: number) => set((state) => {
        state.metadata = {
          ...state.metadata,
          currentStep: step,
          updatedAt: new Date().toISOString()
        }
      }),

      resetData: () => set(() => ({
        ...initialState,
        metadata: {
          ...initialState.metadata,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      })),

      updateGoals: (goals) => set((state) => {
        Object.assign(state.goals, goals)
        state.metadata = {
          ...state.metadata,
          updatedAt: new Date().toISOString()
        }
      }),

      addIssue: (issue) => set((state) => {
        const newIssue: Issue = {
          ...issue,
          id: Date.now().toString()
        }
        state.issues.push(newIssue)
        state.metadata = {
          ...state.metadata,
          updatedAt: new Date().toISOString()
        }
      }),

      updateIssue: (id, updates) => set((state) => {
        const index = state.issues.findIndex(issue => issue.id === id)
        if (index !== -1) {
          Object.assign(state.issues[index], updates)
          state.metadata = {
            ...state.metadata,
            updatedAt: new Date().toISOString()
          }
        }
      }),

      removeIssue: (id) => set((state) => {
        state.issues = state.issues.filter(issue => issue.id !== id)
        state.metadata = {
          ...state.metadata,
          updatedAt: new Date().toISOString()
        }
      }),

      addBatnaOption: (option) => set((state) => {
        const netValue = option.gain - option.directCost - option.riskPenalty - option.switchCost
        const newOption: BatnaOption = {
          ...option,
          id: Date.now().toString(),
          netValue
        }
        state.batnaOptions.push(newOption)
        state.metadata = {
          ...state.metadata,
          updatedAt: new Date().toISOString()
        }
      }),

      updateBatnaOption: (id, updates) => set((state) => {
        const index = state.batnaOptions.findIndex(option => option.id === id)
        if (index !== -1) {
          Object.assign(state.batnaOptions[index], updates)
          // 重新计算净值
          const option = state.batnaOptions[index]
          option.netValue = option.gain - option.directCost - option.riskPenalty - option.switchCost
          state.metadata = {
            ...state.metadata,
            updatedAt: new Date().toISOString()
          }
        }
      }),

      removeBatnaOption: (id) => set((state) => {
        state.batnaOptions = state.batnaOptions.filter(option => option.id !== id)
        state.metadata = {
          ...state.metadata,
          updatedAt: new Date().toISOString()
        }
      }),

      calculateBestBatna: () => set((state) => {
        if (state.batnaOptions.length > 0) {
          state.bestBatna = state.batnaOptions.reduce((best, current) =>
            (current.netValue || 0) > (best.netValue || 0) ? current : best
          )
        }
        state.metadata = {
          ...state.metadata,
          updatedAt: new Date().toISOString()
        }
      }),

      updateBottomLineBuffer: (buffer) => set((state) => {
        state.bottomLineBuffer = buffer
        state.metadata = {
          ...state.metadata,
          updatedAt: new Date().toISOString()
        }
      }),

      addStakeholder: (stakeholder) => set((state) => {
        const newStakeholder: Stakeholder = {
          ...stakeholder,
          id: Date.now().toString()
        }
        state.stakeholders.push(newStakeholder)
        state.metadata = {
          ...state.metadata,
          updatedAt: new Date().toISOString()
        }
      }),

      updateStakeholder: (id, updates) => set((state) => {
        const index = state.stakeholders.findIndex(s => s.id === id)
        if (index !== -1) {
          Object.assign(state.stakeholders[index], updates)
          state.metadata = {
            ...state.metadata,
            updatedAt: new Date().toISOString()
          }
        }
      }),

      removeStakeholder: (id) => set((state) => {
        state.stakeholders = state.stakeholders.filter(s => s.id !== id)
        state.metadata = {
          ...state.metadata,
          updatedAt: new Date().toISOString()
        }
      }),

      updateStrategy: (strategy) => set((state) => {
        Object.assign(state.strategy, strategy)
        state.metadata = {
          ...state.metadata,
          updatedAt: new Date().toISOString()
        }
      }),

      updateAnchorStrategy: (anchor) => set((state) => {
        Object.assign(state.anchorStrategy, anchor)
        state.metadata = {
          ...state.metadata,
          updatedAt: new Date().toISOString()
        }
      }),

      updateReportSettings: (settings) => set((state) => {
        Object.assign(state.reportSettings, settings)
        state.metadata = {
          ...state.metadata,
          updatedAt: new Date().toISOString()
        }
      }),

      loadExample: (type) => set((state) => {
        // 重置所有数据
        Object.assign(state, initialState)
        
        if (type === 'male') {
          // 小李案例：深圳IT工程师的完整谈判准备
          
          // Step 1: 目标设定
          state.goals = {
            primary: '把婚礼总支出控制在20万以内并于8月前举行',
            secondary: ['维护双方家庭关系', '确保婚后生活质量', '避免过度负债'],
            timeline: '3个月内完成谈判并确定婚期',
            constraints: ['个人存款有限', '不愿意贷款', '女方家庭期望较高', '深圳生活成本压力']
          }

          // Step 2: 关键议题
          state.issues = [
            {
              id: '1',
              name: '彩礼金额',
              importance: 10,
              idealValue: 15,
              acceptableValue: 18,
              bottomLine: 22,
              unit: '万元',
              description: '最核心的谈判议题，直接影响总预算'
            },
            {
              id: '2',
              name: '婚房署名',
              importance: 8,
              idealValue: 100,
              acceptableValue: 50,
              bottomLine: 0,
              unit: '%男方占比',
              description: '房产证署名比例，影响未来安全感'
            },
            {
              id: '3',
              name: '三金重量',
              importance: 6,
              idealValue: 15,
              acceptableValue: 24,
              bottomLine: 30,
              unit: '克',
              description: '金饰总重量，体现诚意但成本较高'
            },
            {
              id: '4',
              name: '家电装修预算',
              importance: 7,
              idealValue: 5,
              acceptableValue: 8,
              bottomLine: 12,
              unit: '万元',
              description: '新房装修和家电采购预算'
            },
            {
              id: '5',
              name: '婚礼规模',
              importance: 5,
              idealValue: 150,
              acceptableValue: 200,
              bottomLine: 300,
              unit: '人',
              description: '婚宴人数直接影响成本'
            }
          ]

          // Step 4: BATNA选项
          state.batnaOptions = [
            {
              id: '1',
              name: '推迟婚期6个月',
              description: '等存款增加5万，但女方家庭压力增大',
              gain: 5,
              directCost: 0,
              riskPenalty: 1,
              switchCost: 0,
              netValue: 4
            },
            {
              id: '2',
              name: '改为旅行婚礼',
              description: '全套支出≤10万，但缺少传统仪式感',
              gain: 10,
              directCost: 0,
              riskPenalty: 3,
              switchCost: 1,
              netValue: 6
            },
            {
              id: '3',
              name: '向父母借款',
              description: '增加5万预算空间，但增加家庭负担',
              gain: 5,
              directCost: 0.5,
              riskPenalty: 2,
              switchCost: 0.5,
              netValue: 2
            }
          ]
          state.bestBatna = state.batnaOptions[1] // 旅行婚礼净值最高
          state.bottomLineBuffer = 3

          // Step 5: 利益相关者
          state.stakeholders = [
            {
              id: '1',
              name: '女方父亲',
              role: '决策者',
              influence: 9,
              support: 4,
              painPoints: ['担心女儿嫁得不体面', '在亲戚面前没面子', '彩礼低于当地平均水平'],
              interests: ['女儿婚后幸福', '家族声誉', '经济安全感']
            },
            {
              id: '2',
              name: '女方母亲',
              role: '影响者',
              influence: 8,
              support: 5,
              painPoints: ['担心女儿受委屈', '婚礼不够隆重', '三金质量不够'],
              interests: ['女儿生活质量', '婚礼仪式感', '邻里认可']
            },
            {
              id: '3',
              name: '小舅子(女方弟弟)',
              role: '关键盟友',
              influence: 7,
              support: 6,
              painPoints: ['姐姐嫁人后家庭关系变化', '男方是否靠谱'],
              interests: ['姐姐幸福', '家庭和谐', '个人发展机会']
            },
            {
              id: '4',
              name: '女方本人',
              role: '当事人',
              influence: 6,
              support: 7,
              painPoints: ['父母期望与男友能力的矛盾', '婚后生活压力'],
              interests: ['爱情与现实的平衡', '未来生活稳定', '家庭和睦']
            }
          ]

          // Step 6: 谈判策略
          state.strategy = {
            approach: 'collaborative',
            concessionPattern: 'step',
            timeStrategy: '先建立信任关系，再逐步讨论具体数字；利用8月婚期的时间压力，但不急于求成'
          }

          // Step 7: 锚点策略
          state.anchorStrategy = {
            type: 'moderate',
            firstOffer: {
              '1': 15, // 彩礼15万
              '2': 100, // 房产男方全署名
              '3': 15, // 三金15克
              '4': 5, // 家电装修5万
              '5': 150 // 婚礼150人
            },
            justification: [
              '根据深圳同城10起近两年彩礼调研，平均区间13-20万',
              '房产由男方全款购买，署名体现产权清晰',
              '三金选择足金材质，重量适中体现心意',
              '家电装修预算考虑实用性和经济性',
              '婚礼规模控制在亲友范围，注重质量而非数量'
            ]
          }

        } else {
          // 女方视角示例数据
          state.goals = {
            primary: '获得体现诚意和保障的彩礼安排，确保婚后生活稳定',
            secondary: ['维护家庭体面和声誉', '获得合理的经济保障', '确保婚礼隆重得体'],
            timeline: '2个月内达成一致',
            constraints: ['当地彩礼习俗标准18万', '父母面子和期望', '亲戚朋友的比较压力']
          }

          // 女方的议题优先级会有所不同
          state.issues = [
            {
              id: '1',
              name: '彩礼金额',
              importance: 10,
              idealValue: 20,
              acceptableValue: 18,
              bottomLine: 15,
              unit: '万元',
              description: '体现男方诚意和家庭重视程度'
            },
            {
              id: '2',
              name: '婚房署名',
              importance: 9,
              idealValue: 50,
              acceptableValue: 50,
              bottomLine: 30,
              unit: '%女方占比',
              description: '婚后安全感的重要保障'
            }
          ]
        }

        state.metadata = {
          ...state.metadata,
          updatedAt: new Date().toISOString(),
          currentStep: 1
        }
      })
    })),
    {
      name: 'negotiation-data',
      version: 1,
    }
  )
)