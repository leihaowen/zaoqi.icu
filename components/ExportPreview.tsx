'use client'

import { useNegotiationStore } from '@/lib/store'
import { generateExportContent } from '@/lib/export'
import { useEffect, useState } from 'react'

export default function ExportPreview() {
  const {
    goals,
    issues,
    batnaOptions,
    bestBatna,
    bottomLineBuffer,
    stakeholders,
    strategy,
    anchorStrategy
  } = useNegotiationStore()
  const [previewContent, setPreviewContent] = useState('')

  useEffect(() => {
    const content = generateExportContent({
      goals,
      issues,
      batnaOptions,
      bestBatna,
      bottomLineBuffer,
      stakeholders,
      strategy,
      anchorStrategy
    })
    setPreviewContent(content)
  }, [goals, issues, batnaOptions, bestBatna, bottomLineBuffer, stakeholders, strategy, anchorStrategy])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          导出预览
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          这是您的谈判准备报告预览，点击导出按钮可生成 PNG 或 PDF 文件
        </p>
      </div>
      
      <div 
        className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white shadow-lg"
        style={{ minHeight: '600px' }}
      >
        <div 
          dangerouslySetInnerHTML={{ __html: previewContent }}
          className="export-preview"
        />
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 提示：导出的文件将包含完整的谈判准备内容，格式专业美观
        </p>
      </div>
    </div>
  )
}