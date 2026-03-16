'use client';

import { useState } from 'react';

interface ReasoningStep {
  step: number;
  content: string;
  type: 'thought' | 'action' | 'conclusion';
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [reasoning, setReasoning] = useState<ReasoningStep[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [finalAnswer, setFinalAnswer] = useState('');

  const examples = [
    "解释量子纠缠的本质，用生活化的例子说明",
    "如何从唯物主义角度理解人工智能的'意识'问题？",
    "为什么深度学习模型能够泛化到训练数据之外？",
  ];

  const simulateReasoning = async (userPrompt: string) => {
    setIsLoading(true);
    setReasoning([]);
    setFinalAnswer('');

    // 模拟推理步骤（实际应用中调用 DeepSeek API）
    const steps: ReasoningStep[] = [
      {
        step: 1,
        type: 'thought',
        content: '首先需要理解问题的核心：用户在询问...'
      },
      {
        step: 2,
        type: 'thought',
        content: '让我分析这个问题的几个维度：1) 理论基础 2) 实践意义 3) 类比方法'
      },
      {
        step: 3,
        type: 'action',
        content: '检索相关知识库：量子力学基本原理...'
      },
      {
        step: 4,
        type: 'thought',
        content: '现在我需要找一个恰当的类比。经典的"硬币"类比可能不够准确...'
      },
      {
        step: 5,
        type: 'conclusion',
        content: '综合以上分析，我可以给出一个清晰的解释...'
      }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setReasoning(prev => [...prev, step]);
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    setFinalAnswer(`针对"${userPrompt}"的问题，这里是我的回答：

量子纠缠是量子力学中最反直觉的现象之一。简单来说，两个粒子一旦发生纠缠，无论相隔多远，对其中一个粒子的测量会瞬间影响另一个粒子的状态。

**生活化类比**：想象你有一对魔法骰子。你把它们分开放在地球和月球上。当你在地球上掷骰子得到6时，月球上的那颗骰子会瞬间确定为1（总和为7）。但关键是：在你掷之前，两颗骰子都处于"未确定"状态，不是预先约定好的。

**本质理解**：这不是超光速信息传递，而是量子态的非局域关联。纠缠态是一个整体，不能简单分割成两个独立部分。测量只是揭示了这个整体的性质，而非"发送"了信息。

这个现象挑战了我们的经典直觉，但却是量子计算和量子通信的基础。`);

    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      simulateReasoning(prompt);
    }
  };

  const getStepColor = (type: string) => {
    switch (type) {
      case 'thought':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
      case 'action':
        return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
      case 'conclusion':
        return 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800';
      default:
        return 'bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800';
    }
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'thought':
        return '🤔';
      case 'action':
        return '⚡';
      case 'conclusion':
        return '💡';
      default:
        return '📝';
    }
  };

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <main className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            DeepSeek R1 Playground 🧠
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            实时可视化 AI 的推理过程 · 探索思维链的每一步
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="输入你的问题..."
              className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 
                       focus:border-blue-500 dark:focus:border-blue-400 outline-none
                       bg-white dark:bg-gray-800 text-lg"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
                       text-white font-semibold hover:shadow-lg transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '思考中...' : '开始推理'}
            </button>
          </div>
        </form>

        <div className="mb-6 flex gap-2 flex-wrap">
          <span className="text-sm text-gray-500 dark:text-gray-400 self-center">示例问题：</span>
          {examples.map((example, idx) => (
            <button
              key={idx}
              onClick={() => setPrompt(example)}
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 
                       hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors
                       text-sm text-gray-700 dark:text-gray-300"
              disabled={isLoading}
            >
              {example}
            </button>
          ))}
        </div>

        {reasoning.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>🔍</span>
              <span>推理过程</span>
            </h2>
            <div className="space-y-4">
              {reasoning.map((step) => (
                <div
                  key={step.step}
                  className={`p-6 rounded-xl border-2 ${getStepColor(step.type)} 
                           transform transition-all duration-300 hover:scale-[1.01]`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getStepIcon(step.type)}</span>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                        Step {step.step} · {step.type === 'thought' ? '思考' : step.type === 'action' ? '行动' : '结论'}
                      </div>
                      <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {step.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {finalAnswer && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>✨</span>
              <span>最终回答</span>
            </h2>
            <div className="p-8 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 
                          dark:from-blue-900/20 dark:to-purple-900/20 border-2 
                          border-blue-200 dark:border-blue-800">
              <div className="prose dark:prose-invert max-w-none">
                {finalAnswer.split('\n').map((line, idx) => (
                  <p key={idx} className="mb-2 text-gray-800 dark:text-gray-200">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {!reasoning.length && !isLoading && (
          <div className="text-center py-20 text-gray-400 dark:text-gray-600">
            <div className="text-6xl mb-4">🤖</div>
            <p className="text-lg">输入问题，开始探索 AI 的思维过程</p>
          </div>
        )}
      </main>

      <footer className="mt-20 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          Powered by <strong>DeepSeek R1</strong> · 
          <a href="https://github.com/aether-dev-ai/deepseek-r1-playground" className="ml-2 hover:text-blue-500 transition-colors">
            View on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
