/**
 * tool_use-data.js — 由 pipeline/build.py 于 2026-06-16 17:00:05 自动生成。
 * 源文件：content/agent/tool_use.md
 * ⚠️  请勿手动修改；如需更新，修改源文档后重新编译。
 */
window.PAGE_CONFIG = {
  "meta": {
    "domain": "agent",
    "topic_id": "tool_use",
    "topic_name": "Agent工具调用",
    "page_title": "Agent工具调用技术演进",
    "page_subtitle": "2026-06-16 版",
    "page_desc": "从模块化专家路由、ReAct工具闭环、自监督Toolformer，到Gorilla/ToolLLM的API检索选择、LLMCompiler与AsyncFC的复杂编排，再到MCP、BFCL、τ-bench与APB代表的协议和评测标准化，系统梳理Agent工具调用主线。",
    "page_icon": "🛠️",
    "hero_pills": [
      "🏷️ Tool Use · Function Calling · API Retrieval · MCP",
      "Planning · Orchestration · RL · Benchmarks"
    ],
    "count_pill": "{count} 个算法",
    "image_base": "",
    "overview_from_doc": true,
    "latest_overview_from_doc": true
  },
  "overview": [
    {
      "title": "",
      "body_html": "<h1>智能体架构汇总（二）——工具调用(Tool Call)</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/1979960860379223332\">https://zhuanlan.zhihu.com/p/1979960860379223332</a></li>\n<li>作者: 大模型视界</li>\n</ul>\n<hr />\n<p>智能体架构汇总（二）——工具调用(Tool Call)</p>\n<h1>智能体架构汇总（二）——工具调用(Tool Call)</h1>\n<p>作者: 大模型视界, 赞: 0</p>\n<p><strong>序：借由 Tool Call，智能体第一次真正具备了“触达现实世界”的能力。</strong></p>\n<p>感谢邀请回答。本文将从理论和实战详细介绍LLM工具调用。<strong>源码可关注vx公众号：大模型视界</strong></p>\n<p>继上篇介绍了Reflection之后，今天向大家介绍第二种智能体——工具调用（Tool call）。毫不夸张的说Tool call绝对是最具变革性的智能体架构之一，这种模式是连接大型语言模型推理能力与真实、动态世界的桥梁。</p>\n<p><strong>这个系列想做什么？</strong></p>\n<ul>\n<li>做一份“活”的架构地图，帮你把框架脉络捋清</li>\n<li>不止讲原理，更给出能在你环境里直接跑起来的代码</li>\n<li>以底层逻辑为主线，强调实操与可复用性</li>\n</ul>\n<p><strong>本文结构</strong></p>\n<ul>\n<li>上篇｜理论篇：梳理 Tool call的核心思想与关键技术点</li>\n<li>下篇｜实战篇：用 Python 手把手实现一个可运行的Tool call Agent，零门槛复现</li>\n</ul>\n<h2><strong>一、Tool call理论（上篇）</strong></h2>\n<p>如果没有工具，LLM（大语言模型）就是一个封闭系统，其知识仅限于训练数据中冻结的信息。它无法了解今天的天气、股票的当前价格，也无法了解公司数据库中订单的状态。通过赋予智能体使用工具的能力，我们使其能够克服这一根本限制，从而查询 API、搜索数据库并访问实时信息，最终提供不仅合乎逻辑，而且真实、及时、相关的答案。</p>\n<h3><strong>定义</strong></h3>\n<p><strong>Tool call</strong>架构赋予基于 LLM 的代理调用外部函数或 API（即“工具”）的能力。代理能够自主判断用户查询何时无法仅凭其内部知识解答，并确定调用哪个工具来查找所需信息。</p>\n<h3><strong>Tool call流程</strong></h3>\n<ol>\n<li><strong>接收查询：代理收到来自用户的请求。</strong></li>\n<li><strong>决策：代理分析查询及其可用工具，并判断是否需要使用工具才能准确回答问题。</strong></li>\n<li><strong>观察：系统执行工具调用，并将结果（“观察”）返回给代理。</strong></li>\n<li><strong>综合：智能体将工具的输出整合到其推理过程中，为用户生成最终的、有理有据的答案。</strong></li>\n</ol>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-ce2f5fc9ee1069aea1de8f45b479e85f_1440w.jpg\" /></p>\n<p>Tool call流程</p>\n<h3><strong>何时使用Tool call</strong></h3>\n<ul>\n<li><strong>查询助手：使用网络搜索 API 回答需要最新信息的问题。</strong></li>\n<li><strong>企业助手：查询公司内部数据库以回答诸如“上周有多少新用户注册？”之类的问题。</strong></li>\n<li><strong>科学与数学任务：使用计算器或 WolframAlpha 等计算引擎进行 LLM 经常难以完成的精确计算。</strong></li>\n</ul>\n<h3><strong>优势与劣势</strong></h3>\n<ul>\n<li>\n<p><strong>优势</strong></p>\n</li>\n<li>\n<p><strong>事实依据：通过获取真实、实时的数据，大幅减少幻觉。</strong></p>\n</li>\n<li>\n<p><strong>可扩展性：只需添加新工具，即可不断扩展代理的功能。</strong></p>\n</li>\n<li>\n<p><strong>劣势</strong></p>\n</li>\n<li>\n<p><strong>集成开销：需要仔细的“管道”来定义工具、处理 API 密钥和管理潜在的工具故障。</strong></p>\n</li>\n<li><strong>工具信任度：智能体回答的质量取决于其所用工具的可靠性和准确性。智能体必须信任其工具能够提供正确的信息。</strong></li>\n</ul>\n<h2><strong>二、Tool call技术实战（下篇）</strong></h2>\n<h3><strong>0、基础建设与搭建</strong></h3>\n<p>和构建Reflection Agent一样，首先需要设置环境。这包括安装必要的库、导入模块以及配置 API 密钥。</p>\n<p><strong>0.1：安装核心库</strong></p>\n<p>为本项目安装必要的 Python 库。langchain <code>langchain_openai</code> 包提供对任何兼容openai协议模型的访问， <code>langchain</code> 和 <code>langgraph</code> 将提供核心编排框架， <code>python-dotenv</code> 将管理我们的 API 密钥，而 <code>rich</code> 将帮助我们以美观的方式打印输出，此外还需要安装 <code>tavily-python</code> ，它为提供给代理的强大网络搜索工具提供了一个易于使用的 API。</p>\n<pre><code>pip install langchain-openai langchain langgraph rich python-dotenv tavily-python\n</code></pre>\n<p><strong>0.2：导入库和设置密钥</strong></p>\n<p>现在，从已安装的库中导入所有必要的组件。使用 <code>python-dotenv</code> 库从本地 <code>.env</code> 文件安全地加载 LLM的base_url、api_key、model等。你可以在任何提供api服务的供应商获取配置，如openai官网、deepseek官网、硅基流动\\openrouter等大模型服务提供商。视界君使用的就是openrouter上提供的模型。这一步是你自己必须独立完成的！</p>\n<p>你必须在与此代码相同的目录中创建一个名为 <code>.env</code> 的文件，并将你自己的密钥添加到该文件中，如下所示：</p>\n<pre><code>base_url=&quot;your_base_url_here&quot;\n</code></pre>\n<p>导入依赖库并测试LLM：</p>\n<pre><code>import os\nimport json\nfrom typing import List, TypedDict, Optional\nfrom dotenv import load_dotenv\n\n# LangChain components\nfrom pydantic import BaseModel, Field # Corrected import for Pydantic v2\nfrom langgraph.graph import StateGraph, END\n\n# For pretty printing\nfrom rich.console import Console\nfrom rich.markdown import Markdown\nfrom rich.syntax import Syntax\nfrom langchain_openai import ChatOpenAI\n\n# --- API Key and Tracing Setup ---\nload_dotenv()\n\n# Set up LangSmith tracing\nos.environ[&quot;LANGCHAIN_TRACING_V2&quot;] = &quot;true&quot;\nos.environ[&quot;LANGCHAIN_PROJECT&quot;] = &quot;Agentic Architecture - Reflection&quot;\n\n# Check that the keys are set\nif not os.environ.get(&quot;api_key&quot;):\n    print(&quot;api_key not found. Please create a .env file and set it.&quot;)\nif not os.environ.get(&quot;base_url&quot;):\n    print(&quot;base_url not found. Please create a .env file and set it for tracing.&quot;)\nif not os.environ.get(&quot;model&quot;):\n    print(&quot;model not found. Please create a .env file and set it for tracing.&quot;)\nif not os.environ.get(&quot;TAVILY_API_KEY&quot;):\n    print(&quot;TAVILY_API_KEY not found. Please create a .env file and set it for tracing.&quot;)\n\nprint(&quot;Environment variables loaded and tracing is set up.&quot;)\n\n# Check llm\nllm = ChatOpenAI(\n    base_url=os.environ.get(&quot;base_url&quot;),\n    api_key=os.environ.get(&quot;api_key&quot;),\n    model=os.environ.get(&quot;model&quot;)  # 在 OpenRouter 模型浏览器里复制即可\n)\nprint(llm.invoke(&quot;用三句话介绍量子计算&quot;))\n</code></pre>\n<h3>1、<strong>定义Agent工具包</strong></h3>\n<p>Agent的能力取决于它所能使用的工具。在这个阶段，定义并测试提供给代理的特定工具：实时网络搜索。搜索引擎使用的是tavily，需要提前去官网注册并申请api-key。</p>\n<p><strong>1.1：创建和测试网络搜索工具。</strong></p>\n<p>实例化 <code>TavilySearchResults</code> 工具。定义工具最关键的部分是工具<strong>描述</strong> 。LLM 使用这种自然语言描述来理解工具的功能以及何时使用。清晰、精确的描述对于智能体做出正确的决策至关重要。接下来，我们将直接测试该工具，查看其原始输出结果。</p>\n<pre><code># Initialize the tool. We can set the max number of results to keep the context concise.\nsearch_tool = TavilySearchResults(max_results=2)\n\n# It's crucial to give the tool a clear name and description for the agent\nsearch_tool.name = &quot;web_search&quot;\nsearch_tool.description = &quot;A tool that can be used to search the internet for up-to-date information on any topic, including news, events, and current affairs.&quot;\n\ntools = [search_tool]\nprint(f&quot;Tool '{search_tool.name}' created with description: '{search_tool.description}'&quot;)\n\nconsole = Console()\n\n# Let's test the tool directly to see its output format\nprint(&quot;\\n--- Testing the tool directly ---&quot;)\ntest_query = &quot;Which team win the champion of nba 2025&quot; \ntest_result = search_tool.invoke({&quot;query&quot;: test_query})\nconsole.print(f&quot;[bold green]Query:[/bold green] {test_query}&quot;)\nconsole.print(&quot;\\n[bold green]Result:[/bold green]&quot;)\nconsole.print(test_result)\n</code></pre>\n<p>测试展示了 <code>web_search</code> 工具的原始输出。它返回一个字典列表，每个字典包含搜索结果的 URL 和内容摘要。这种结构化信息正是智能体在决定使用该工具后将接收到的“观察结果”。现在我们有了一个功能完善的工具，接下来就可以构建能够学习如何使用该工具的智能体了。</p>\n<h3>2、<strong>使用 LangGraph 构建工具使用代理</strong></h3>\n<p><strong>2.1：定义图状态</strong></p>\n<p>“状态”是图的内存。它是一个在节点间传递的核心对象，每个节点都可以对其进行读写操作。对于使用工具的智能体而言，其状态通常是一个消息列表，代表对话历史记录。该历史记录包括用户的问题、智能体的思考和工具调用，以及这些工具的返回结果。我们将使用一个可以存储任何类型 LangChain 消息的 <code>TypedDict</code></p>\n<pre><code>class AgentState(TypedDict):\n    messages: Annotated[list[AnyMessage], add_messages]\n\nprint(&quot;AgentState TypedDict defined to manage conversation history.&quot;)\n</code></pre>\n<p><strong>2.2：将工具绑定到 LLM</strong></p>\n<p>这一步非常重要，需要让 LLM“感知”这些工具。使用 <code>.bind_tools()</code> 方法，将工具的名称和描述传递给 LLM 的系统提示符。这样，模型的内部逻辑就能根据工具的描述来决定何时调用它。</p>\n<pre><code>llm = ChatOpenAI(\n    base_url=os.environ.get(&quot;base_url&quot;),\n    api_key=os.environ.get(&quot;api_key&quot;),\n    model=os.environ.get(&quot;model&quot;)  \n)\n\n# Bind the tools to the LLM, making it tool-aware\nllm_with_tools = llm.bind_tools(tools)\n\nprint(&quot;LLM has been bound with the provided tools.&quot;)\n</code></pre>\n<p><strong>2.2：定义Agent节点</strong></p>\n<p>图有两个主要节点：</p>\n<ol>\n<li><strong><code>agent_node</code> ：</strong> 这是“大脑”。它会调用 LLM 并传递当前的对话历史记录。LLM 的响应要么是最终答案，要么是调用某个工具的请求。</li>\n<li><strong><code>tool_node</code></strong> <strong>：</strong> 这是“执行者”。它接收来自 <code>agent_node</code> 工具调用请求，执行相应的工具，并返回输出。我们将使用 LangGraph 预构建的 <code>ToolNode</code> 来实现这一点。</li>\n</ol>\n<pre><code>def agent_node(state: AgentState):\n    &quot;&quot;&quot;The primary node that calls the LLM to decide the next action.&quot;&quot;&quot;\n    console.print(&quot;--- AGENT: Thinking... ---&quot;)\n    response = llm_with_tools.invoke(state[&quot;messages&quot;])\n    return {&quot;messages&quot;: [response]}\n\n# The ToolNode is a pre-built node from LangGraph that executes tools\ntool_node = ToolNode(tools)\n\nprint(&quot;Agent node and Tool node have been defined.&quot;)\n</code></pre>\n<p><strong>2.2：定义条件路由</strong></p>\n<p><code>agent_node</code> 运行完毕后，我们需要决定下一步的去向。路由函数会检查 agent 发送的最后一条消息。如果该消息包含 <code>tool_calls</code> 属性，则表示 agent 想要使用某个工具，因此我们会将其路由到 <code>tool_node</code> 。否则，表示 agent 已做出最终决定，我们可以结束工作流。</p>\n<pre><code>def router_function(state: AgentState) -&gt; str:\n    &quot;&quot;&quot;Inspects the agent's last message to decide the next step.&quot;&quot;&quot;\n    last_message = state[&quot;messages&quot;][-1]\n    if last_message.tool_calls:\n        # The agent has requested a tool call\n        console.print(&quot;--- ROUTER: Decision is to call a tool. ---&quot;)\n        return &quot;call_tool&quot;\n    else:\n        # The agent has provided a final answer\n        console.print(&quot;--- ROUTER: Decision is to finish. ---&quot;)\n        return &quot;__end__&quot;\n\nprint(&quot;Router function defined.&quot;)\n</code></pre>\n<h3>3、<strong>组装和运行工作流</strong></h3>\n<p>现在将所有组件连接成一个完整的、可执行的图，并在一个查询上运行它，该查询会强制代理使用其新的网络搜索功能。</p>\n<p><strong>3.1：构建和可视化图表</strong></p>\n<p>创建 <code>StateGraph</code> 并添加节点和边。关键部分是条件边，它使用我们的 <code>router_function</code> 来创建代理的主要推理循环： <code>agent -&gt; router -&gt; tool -&gt; agent</code> 。</p>\n<pre><code>graph_builder = StateGraph(AgentState)\n\n# Add the nodes\ngraph_builder.add_node(&quot;agent&quot;, agent_node)\ngraph_builder.add_node(&quot;call_tool&quot;, tool_node)\n\n# Set the entry point\ngraph_builder.set_entry_point(&quot;agent&quot;)\n\n# Add the conditional router\ngraph_builder.add_conditional_edges(\n    &quot;agent&quot;,\n    router_function,\n)\n\n# Add the edge from the tool node back to the agent to complete the loop\ngraph_builder.add_edge(&quot;call_tool&quot;, &quot;agent&quot;)\n\n# Compile the graph\ntool_agent_app = graph_builder.compile()\n\nprint(&quot;Tool-using agent graph compiled successfully!&quot;)\n\n# Visualize the graph\ntry:\n    from IPython.display import Image, display\n    png_image = tool_agent_app.get_graph().draw_png()\n    display(Image(png_image))\nexcept Exception as e:\n    print(f&quot;Graph visualization failed: {e}. Please ensure pygraphviz is installed.&quot;)\n</code></pre>\n<p>编译后的图已准备就绪。可视化图清晰地展示了智能体的推理循环。该过程从 <code>agent</code> 节点开始。条件边（用菱形表示）随后引导流程。如果需要工具，则调用 <code>call_tool</code> ，并将输出反馈给 <code>agent</code> 进行合成。如果不需要工具，则流程 <code>__end__</code> 。这种结构完美地实现了工具使用模式。</p>\n<p><strong>3.2：端到端执行</strong></p>\n<p>用一个它不可能从训练数据中得知的问题来运行智能体，迫使它使用网络搜索工具。打印其中间步骤，观察它的推理过程。</p>\n<pre><code>user_query = &quot;What were the main announcements from Apple's latest WWDC event?&quot;\ninitial_input = {&quot;messages&quot;: [(&quot;user&quot;, user_query)]}\n\nconsole.print(f&quot;[bold cyan] Kicking off Tool Use workflow for request:[/bold cyan] '{user_query}'\\n&quot;)\n\nfor chunk in tool_agent_app.stream(initial_input, stream_mode=&quot;values&quot;):\n    chunk[&quot;messages&quot;][-1].pretty_print()\n    console.print(&quot;\\n---\\n&quot;)\n\nconsole.print(&quot;\\n[bold green] Tool Use workflow complete![/bold green]&quot;)\n</code></pre>\n<h3><strong>4、评估</strong></h3>\n<p>现在智能体已经运行完毕，可以评估一下它的性能。对于使用工具的智能体，我们关心两件事：它是否正确使用了工具，以及从工具输出中综合得到的最终答案是否高质量？</p>\n<p><strong>4.1、分析执行轨迹</strong></p>\n<p>通过查看上一步的流式输出，可以追踪智能体的确切思考过程。输出显示了在图状态中流动的不同类型的消息（包含 <code>tool_calls</code> 的 <code>AIMessage</code> 和包含结果的 <code>ToolMessage</code> ）。<strong>输出结果讨论：</strong> 执行跟踪清晰地显示了工具使用模式的实际应用：</p>\n<ol>\n<li>打印的第一条消息来自 <code>agent</code> 节点。这是一条包含 <code>tool_calls</code> 属性的 <code>AIMessage</code> ，表明 LLM 已正确决定使用 <code>web_search</code> 工具。</li>\n<li>下一条消息是 <code>ToolMessage</code> 。这是 <code>tool_node</code> 执行搜索并返回原始结果后的输出。</li>\n<li>最后一条消息是另一条 <code>AIMessage</code> ，但这次没有 <code>tool_calls</code> 。这是代理将 <code>ToolMessage</code> 中的信息综合起来，为用户生成一个连贯的最终答案。这条跟踪记录证实了代理的逻辑和图的路由都运行正常。</li>\n</ol>\n<p><strong>4.2、用LLM 作为评委进行评估</strong></p>\n<p>创建一个“评判型”学习逻辑模型（LLM），用于对智能体的性能进行结构化的量化评估。评估标准将专门针对工具使用质量进行评估。</p>\n<pre><code>class ToolUseEvaluation(BaseModel):\n    &quot;&quot;&quot;Schema for evaluating the agent's tool use and final answer.&quot;&quot;&quot;\n    tool_selection_score: int = Field(description=&quot;Score 1-5 on whether the agent chose the correct tool for the task.&quot;)\n    tool_input_score: int = Field(description=&quot;Score 1-5 on how well-formed and relevant the input to the tool was.&quot;)\n    synthesis_quality_score: int = Field(description=&quot;Score 1-5 on how well the agent integrated the tool's output into its final answer.&quot;)\n    justification: str = Field(description=&quot;A brief justification for the scores.&quot;)\n\njudge_llm = llm.with_structured_output(ToolUseEvaluation)\n\n# To evaluate, we need to reconstruct the full conversation trace\nfinal_answer = tool_agent_app.invoke(initial_input)\nconversation_trace = &quot;\\n&quot;.join([f&quot;{m.type}: {m.content or ''} {getattr(m, 'tool_calls', '')}&quot; for m in final_answer['messages']])\n\ndef evaluate_tool_use(trace: str):\n    prompt = f&quot;&quot;&quot;You are an expert judge of AI agents. Evaluate the following conversation trace based on the agent's tool use on a scale of 1-5. Provide a brief justification.\n\n    Conversation Trace:\n    ```\n    {trace}\n    ```\n    &quot;&quot;&quot;\n    return judge_llm.invoke(prompt)\n\nconsole.print(&quot;--- Evaluating Tool Use Performance ---&quot;)\nevaluation = evaluate_tool_use(conversation_trace)\nconsole.print(evaluation.model_dump())\n</code></pre>\n<p>输出结果讨论： LLM 作为评判者，能够对我们智能体的性能进行结构化且合理的评估。在所有三个类别 <code>tool_selection_score</code> 、 <code>tool_input_score</code> 和 <code>synthesis_quality_score</code> ）中均获得高分，这证实了我们的智能体不仅使用了工具，而且<em>有效地</em>使用了它们。它正确识别了网络搜索的需求，构建了相关的查询，并成功地将检索到的信息综合成一个有用且准确的最终答案。这种自动化评估增强了我们对实现方案稳健性的信心。</p>\n<h3><strong>4、结论</strong></h3>\n<p>在本文中，我们基于<strong>工具调用</strong>架构构建了一个完整且功能完善的Agent。成功地为基于openai 的 LLM 配备了网络搜索工具，并使用 LangGraph 创建了一个稳健的推理循环，使智能体能够决定何时以及如何使用该工具。 端到端的执行和后续评估充分展现了这种模式的巨大价值。通过将智能体连接到实时外部信息，从根本上克服了静态训练数据的局限性。</p>\n<p>智能体不再仅仅是推理者，而是一位研究者，能够提供基于事实、基于现实且与时俱进的答案。这种架构是构建几乎所有实用型现实世界人工智能助手的基础模块。</p>\n<p>好了，本期分享就到这里，感谢你的阅读，希望文章对你有所帮助！</p>\n<p>我是视界君，我们下期再见！</p>"
    }
  ],
  "latest_overview": [
    {
      "title": "",
      "body_html": "<h1>智能体只会机械调工具？ICLR 2026五种方案让Agent学会灵活规划与自我进化</h1>\n<ul>\n<li>来源平台: <strong>zhihu</strong>（知乎专栏文章）</li>\n<li>原文链接: <a href=\"https://zhuanlan.zhihu.com/p/2042373114722522152\">https://zhuanlan.zhihu.com/p/2042373114722522152</a></li>\n<li>作者: nightli101</li>\n</ul>\n<hr />\n<p>智能体只会机械调工具？ICLR 2026五种方案让Agent学会灵活规划与自我进化</p>\n<h1>智能体只会机械调工具？ICLR 2026五种方案让Agent学会灵活规划与自我进化</h1>\n<p>作者: nightli101, 赞: 0</p>\n<p>大语言模型智能体（Agent）这个概念火了好几年，但真正用起来你会发现一个尴尬的现实：大部分Agent本质上还是在跑固定的ReAct循环——观察、思考、行动，一遍又一遍。遇到简单查询还能应付，一旦任务复杂起来，不是陷入死循环就是工具调用得乱七八糟。更关键的是，现有系统大多孤立运行，不会从经验中学习，也不会根据任务特点动态调整策略。</p>\n<p>最近梳理了一下智能体系统规划、工具使用与工作流优化方向的工作——主要来自ICLR 2026——发现研究者们正在从多个角度突破这些瓶颈：有的用记忆引导动态合成工作流，有的把强化学习直接搬进多轮交互流程，有的从\"近失\"样本中挖掘被忽略的监督信号，有的模拟人类研究过程做深度报告生成，还有的直接把Kaggle社区搬进智能体系统。这篇综述带你看看五篇有意思的工作。</p>\n<p>__________________________________________________</p>\n<h2>一、为什么Agent的规划与工具使用这么难</h2>\n<p>Agent的核心能力可以拆解为三个层面：规划（怎么分解任务）、执行（怎么调用工具）、学习（怎么从经验中进化）。现有系统的问题也恰好出在这三个层面。</p>\n<p>规划层面，大多数Agent采用僵化的ReAct式工具链，线性执行预定义步骤。但真实世界的查询千差万别——有的需要深度搜索，有的需要多工具并行，有的则需要先澄清再行动。用同一套固定流程应对所有任务，就像用同一把钥匙开所有的锁，效率自然大打折扣。</p>\n<p>执行层面，工具调用本身是个高维决策空间。选哪个工具、传什么参数、怎么处理异常，每一步都可能出错。更麻烦的是，现有训练方法大多依赖稀疏的结果奖励——对了就给1，错了就给0——模型根本无法区分\"推理过程正确但答案差了一点\"和\"完全瞎猜\"的样本。</p>\n<p>学习层面，现有Agent基本是\"用一次扔一次\"，不会积累工具使用经验，也不会从过往失败中提炼策略。一个Agent昨天花了20步才找到的答案，今天遇到类似问题又要重新摸索一遍。</p>\n<p>所以怎么让Agent具备灵活规划、精准调用工具、并从经验中持续进化的能力，成了这个领域的核心挑战。</p>\n<p>__________________________________________________</p>\n<h2>二、几篇值得一看的工作</h2>\n<h3>FlowSearcher：记忆引导的动态工作流合成</h3>\n<p>FlowSearcher这篇论文标题是《FlowSearcher: Synthesizing Memory-Guided Agentic Workflows for Web Information Seeking》。它瞄准的问题很直接：现有网页搜索Agent大多采用固定的ReAct式工具链，无法根据查询类型动态调整工具使用的深度和顺序。</p>\n<p>FlowSearcher的解法是\"工作流合成\"。它把查询分解为多个子目标，每个子目标由定制化工作流图（DAG）协调，灵活调整工具使用的深度与顺序。更关键的是它的三层级结构化记忆系统——过往工作流被提炼为结构化经验存储起来，遇到新查询时先检索相关历史轨迹，再基于这些经验生成新的工作流。这种设计让Agent无需任何微调就能具备自适应能力。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-12810159bb1e30cfa985fe68a70b3732_1440w.jpg\" /></p>\n<p><em>FlowSearcher架构</em></p>\n<p>* FlowSearcher的核心设计是\"查询→策略→工作流→执行\"的分层生成。记忆模块存储历史工作流经验，新查询进来时先匹配相似策略，再合成定制化工作流——这跟人类面对新问题时\"回忆以前怎么做的，然后举一反三\"如出一辙。*</p>\n<p>在GAIA、BrowseComp和GPQA上的实验表明，这种无需训练的记忆驱动工作流合成，性能媲美甚至超越了RLHF训练系统。在GAIA Level 1任务上，FlowSearcher达到55.3%的平均准确率，随着限制放宽表现持续提升。记忆策略的消融实验也很有启发：在长任务窗口（1-60）下，仅使用成功样本的记忆策略（30次成功）甚至优于完整记忆策略（26次成功）。</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-4d4454f83425936168b55da14465c47c_1440w.jpg\" /></p>\n<p><em>FlowSearcher记忆策略消融</em></p>\n<p>* 你会发现在长任务窗口下，\"只记成功经验\"（Succ.-Only）反而比\"什么都记\"（Full Mem.）效果更好（30 vs 26）。这说明失败轨迹可能引入了噪声，选择性记忆比全盘接收更高效。*</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-5bc209a53a9136877d88817165269972_1440w.jpg\" /></p>\n<p><em>FlowSearcher性能对比</em></p>\n<p>* 放宽块限制策略（No limitations）后，GAIA平均得分达到55.3%，比First-Hit only策略的46.0%高出近10个百分点——这说明给工作流更多自由度，Agent就能找到更优的搜索路径。*</p>\n<p>__________________________________________________</p>\n<h3>AGENTFLOW：把强化学习直接搬进多轮交互流程</h3>\n<p>AGENTFLOW这篇论文标题是《In-The-Flow: Agentic System Optimization for Effective Planning and Tool Use》，来自斯坦福大学和德州农工大学。它关注的是另一个关键问题：现有工具增强方法训练单一策略，在长周期任务中扩展性差，而且多为离线训练，无法适应多轮交互的动态环境。</p>\n<p>AGENTFLOW的核心创新是一个可训练的流式代理框架。它包含四个模块：Planner（规划器）负责任务分解和工具选择，Executor（执行器）调用工具，Verifier（验证器）检查结果有效性，Generator（生成器）产出最终答案。这四个模块通过共享的演进记忆（Memory）协调，在多轮交互中持续迭代。最关键的是Flow-GRPO算法——它将多轮优化转化为单轮更新，通过广播可验证轨迹的结果来对齐局部决策与全局成功。</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-57b99de7ff7df43d623acb5148233200_1440w.jpg\" /></p>\n<p><em>AGENTFLOW架构</em></p>\n<p>* AGENTFLOW把Agent的执行流程拆成了四个专业化模块，通过共享记忆协调。Planner做决策、Executor去执行、Verifier做检查、Generator出答案——如果Verifier不通过，就回到Planner重新规划。这种闭环设计让Agent具备了\"试错-修正\"的能力。*</p>\n<p>实验覆盖了十个基准测试，包括搜索（Bamboogle、2Wiki、HotpotQA）、数学（AIME24、AMC23、GameOf24）、科学（GPQA、MedQA）和Agentic任务（GAIA）。基于Qwen2.5-7B的AGENTFLOW平均准确率显著超越顶级基线，甚至优于GPT-4o。使用Flow-GRPO训练后，平均得分达到55.7%，而Frozen策略仅44.3%、SFT策略更是崩到了19.5%。</p>\n<p><img alt=\"\" src=\"https://pic1.zhimg.com/v2-6f47d80cbf9d4ca1e8a5ce1ca990967e_1440w.jpg\" /></p>\n<p><em>AGENTFLOW训练策略对比</em></p>\n<p>* Flow-GRPO的平均得分达到55.7%，远超Frozen的44.3%和SFT的19.5%。有意思的是SFT反而让性能崩塌——这说明对于规划任务，直接微调会破坏模型的通用推理能力，而流式强化学习才是正确的训练方式。*</p>\n<p><img alt=\"\" src=\"https://pic3.zhimg.com/v2-7b51982d1fe129e13f9a2c1aa336cb7e_1440w.jpg\" /></p>\n<p><em>AGENTFLOW规模扩展性</em></p>\n<p>* 随着模型规模从7B增加到32B，AGENTFLOW在各任务上的性能稳步提升。在HotpotQA上从21.0提升到27.0，平均推理得分提升23.6%——这说明流式优化方法具有良好的规模扩展性。*</p>\n<p>__________________________________________________</p>\n<h3>E-GRPO：从\"近失\"样本中挖掘被忽略的监督信号</h3>\n<p>E-GRPO这篇论文标题是《Repurposing Synthetic Data for Fine-grained Search Agent Supervision》，来自上海科技大学和阿里巴巴通义实验室。它解决的问题很细但很关键：现有搜索Agent训练方法（如GRPO）只依赖最终结果给奖励，完全丢弃了推理过程中识别出的实体信息。这导致模型无法区分\"推理过程正确但答案差了一点\"的\"近失\"样本和完全失败的样本。</p>\n<p>E-GRPO的核心发现是：Agent推理过程中识别的真值实体数量与最终答案准确率呈强正相关。基于这个观察，作者提出了实体感知组相对策略优化（E-GRPO）——通过构建稠密的实体感知奖励函数，对错误样本按其实体匹配度给予部分奖励。即使最终答案错了，只要推理过程中命中了部分关键实体，模型也能获得正向反馈。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-2e162d68f80cbebbf5a9e5718ab26e59_1440w.jpg\" /></p>\n<p><em>E-GRPO架构</em></p>\n<p>* GRPO只给最终结果打0或1，E-GRPO则在每一步工具调用后检查命中的实体数量，给予连续奖励。这种细粒度反馈让模型能从\"差一点就成功\"的案例中学习——就像考试后老师不只看总分，还看你哪些步骤做对了。*</p>\n<p>在GAIA、BrowseComp、BrowseComp-ZH和X-Bench-DS四个基准上，E-GRPO显著优于传统GRPO。在本地环境（Local）下，7B-E-GRPO在多个问答数据集上的平均得分高于SFT和GRPO基线。更难得的是，E-GRPO不仅提升了准确率，还诱导模型形成了更高效的推理策略——完成任务所需的工具调用次数更少。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-60c303d44369d3e2a45a4b567120cbd7_1440w.jpg\" /></p>\n<p><em>E-GRPO性能对比</em></p>\n<p>* Web-30B-E-GRPO在BrowseComp上取得了有竞争力的表现。虽然跟OpenAI-o3和Claude-4-Sonnet还有差距，但考虑到这是开源Agent方案，这个成绩已经说明实体感知奖励确实能挖掘出被GRPO浪费的学习信号。*</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-e66691560b4479dc085e27a556cd35fa_1440w.jpg\" /></p>\n<p><em>E-GRPO本地任务对比</em></p>\n<p>* Local-7B-E-GRPO在Multi-Hop QA和Single-Hop QA任务上的平均得分优于SFT和GRPO基线。特别是在TQ数据集上，E-GRPO取得了82.0的高分，验证了细粒度实体奖励对搜索Agent训练的有效性。*</p>\n<p>__________________________________________________</p>\n<h3>WebWeaver：模拟人类研究过程的双智能体深度报告生成</h3>\n<p>WebWeaver这篇论文标题是《WebWeaver: Structuring Web-Scale Evidence with Dynamic Outlines for Open-Ended Deep Research》。它关注的是开放深度研究（OEDR）场景——AI Agent需要将海量网络信息整合为结构严谨、引用准确的深度报告。现有方法的问题在于静态研究流程割裂了规划与证据获取，单一生成模式又导致冗余证据和引用幻觉。</p>\n<p>WebWeaver提出双智能体框架：Planner（规划器）负责动态循环，交替进行证据获取与大纲优化，生成基于引用的记忆库大纲；Writer（写作者）则据此分层检索并分节撰写。通过这种\"先规划再写作\"的分工，WebWeaver仅引用所需证据，有效缓解了长上下文问题和引用幻觉。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-76fb093c7847a32e51be4d8d75c65445_1440w.jpg\" /></p>\n<p><em>WebWeaver架构</em></p>\n<p>* WebWeaver模拟了人类做深度研究的过程：先查资料、整理大纲、再查更多资料、优化大纲，反复几轮后再开始写。Planner和Writer各司其职，Planner专注\"研究什么\"，Writer专注\"怎么写\"——这种分离让最终报告的结构更合理、引用更可靠。*</p>\n<p>在DeepResearch Bench、DeepConsult和DeepResearchGym基准上，WebWeaver取得了SOTA成绩。WebWeaver (Claude-sonnet-4) 在DeepResearchGym上平均得分达到96.74，在六个评估维度上胜率都很高——特别是在论据支持维度胜率高达0.76。</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-88564e4ae5d7666193c6ffa0fd822a41_1440w.jpg\" /></p>\n<p><em>WebWeaver基准对比</em></p>\n<p>* WebWeaver (Claude-sonnet-4) 在DeepResearchGym上取得了96.74的平均分，优于ReAct (Qwen2.5-235b) 的86.72和doubao-research。这说明专门化的双智能体架构确实比通用的大模型直接生成更适合深度研究任务。*</p>\n<p><img alt=\"\" src=\"https://pica.zhimg.com/v2-c54684e9b84b2e3f89f303749eac4582_1440w.jpg\" /></p>\n<p><em>WebWeaver多维度评估</em></p>\n<p>* WebWeaver在论据支持维度胜率最高（0.76），在可读性维度胜率最低（0.55）——这说明结构化生成在事实准确性上优势明显，但在行文流畅度上还有提升空间。*</p>\n<p>__________________________________________________</p>\n<h3>CoMind：把Kaggle社区搬进智能体系统</h3>\n<p>CoMind这篇论文标题是《CoMind: Towards Community-Driven Agents for Machine Learning Engineering》，来自北京大学和卡内基梅隆大学。它关注的问题是：现有LLM Agent在自动化机器学习工程时往往孤立工作，缺乏与更广泛研究社区的互动，难以像人类研究者那样通过共享知识获取洞察。</p>\n<p>CoMind的解法很独特——它直接模拟Kaggle社区。系统包含多个角色：Coordinator（协调者）管理整体流程，Analyzer（分析器）评估方案优劣，Idea Proposer（提议者）头脑风暴新架构，Evaluator（评估器）做客观性能评测，Coding Agent（编码智能体）负责实现和运行。这些智能体在一个模拟社区中协作，通过迭代并行探索同时开发多种方案。</p>\n<p><img alt=\"\" src=\"https://pic4.zhimg.com/v2-4d9bfcc426f9e5e42bd8ccf63cbe8779_1440w.jpg\" /></p>\n<p><em>CoMind架构</em></p>\n<p>* CoMind模拟了一个完整的Kaggle社区：协调者管进度、分析器做评估、提议者出主意、评估器跑实验、编码智能体写代码。多个角色并行探索不同方案，通过社区讨论共享洞察——这跟真实科研团队的工作方式几乎一样。*</p>\n<p>在75个历史Kaggle竞赛中，CoMind创下了新的最优记录。更惊人的是，在8场实时竞赛中，CoMind平均表现优于人类竞争对手，3个进入前三，1个登顶。在图像分类、文本分类和音频分类任务上，CoMind全面超越AIDE及其变体——音频分类任务得分高达0.901，而AIDE相关方法均低于0.3。</p>\n<p>* CoMind在图像、文本、音频三个分类任务上全面领先AIDE。特别是在音频分类上0.901 vs &lt;0.3的差距——这说明多智能体社区协作在跨模态任务上的泛化能力很强，不是只擅长某一类问题。*</p>\n<p><img alt=\"\" src=\"https://pic2.zhimg.com/v2-ddf4198f052a82fca81ef19145b43b6d_1440w.jpg\" /></p>\n<p><em>CoMind难度分级表现</em></p>\n<p>* CoMind o4-mini在低难度任务和总体平均上均排名第一（36.00%）。虽然高难度任务对所有Agent都是挑战，但CoMind在低中难度上的稳定性说明社区驱动的方法确实能持续产出可用方案。*</p>\n<p>__________________________________________________</p>\n<h2>三、它们之间怎么选</h2>\n<p>FlowSearcher和AGENTFLOW都关心\"Agent怎么规划任务\"，但角度不同。FlowSearcher走的是\"结构合成\"路线——用记忆引导动态生成工作流图，适合搜索场景下查询类型多变的场景。AGENTFLOW走的是\"在线学习\"路线——用流式强化学习直接在多轮交互中优化规划器，更适合需要持续试错修正的长周期任务。</p>\n<p>E-GRPO和WebWeaver分别解决了Agent训练和生成的两个痛点。E-GRPO从奖励设计角度入手，让Agent能从\"近失\"样本中学习，是对现有训练范式的补充。WebWeaver则从系统架构角度入手，用双智能体分离规划和写作，是对深度研究生成流程的重构。</p>\n<p>CoMind走的是完全不同的路。它不优化单个Agent的规划或工具使用，而是构建多智能体协作社区。这种思路适合需要探索大量方案空间的任务——比如Kaggle竞赛中的特征工程和模型调优。</p>\n<p><strong>简单总结：</strong></p>\n<p>搜索Agent需要根据不同查询动态调整工具使用策略？FlowSearcher的记忆引导工作流合成无需训练就能实现自适应。</p>\n<p>Agent在长周期任务中容易陷入死循环或工具调用失误？AGENTFLOW的流式强化学习让7B模型在10个基准上超越GPT-4o。</p>\n<p>搜索Agent训练效率低，大量\"差一点成功\"的样本被浪费？E-GRPO的实体感知奖励能从这些样本中挖掘出宝贵的学习信号。</p>\n<p>需要生成结构严谨、引用准确的深度研究报告？WebWeaver的Planner-Writer双智能体分离设计是目前的SOTA方案。</p>\n<p>自动化机器学习工程需要探索大量方案？CoMind的模拟Kaggle社区在真实竞赛中战胜了人类选手。</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th>核心策略</th>\n<th>优势</th>\n<th>局限</th>\n<th>适用场景</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>FlowSearcher</td>\n<td>记忆引导工作流合成</td>\n<td>无需训练、自适应查询类型、DAG灵活编排</td>\n<td>记忆库质量决定上限</td>\n<td>网页搜索、信息检索Agent</td>\n</tr>\n<tr>\n<td>AGENTFLOW</td>\n<td>流式在线强化学习</td>\n<td>7B超GPT-4o、闭环试错修正、规模可扩展</td>\n<td>训练流程复杂、需要验证器</td>\n<td>长周期规划、多工具调用</td>\n</tr>\n<tr>\n<td>E-GRPO</td>\n<td>实体感知稠密奖励</td>\n<td>挖掘近失样本、工具调用更少、训练更高效</td>\n<td>限于搜索Agent、依赖实体识别</td>\n<td>搜索Agent训练、知识密集型任务</td>\n</tr>\n<tr>\n<td>WebWeaver</td>\n<td>Planner-Writer双智能体</td>\n<td>引用准确率高、结构严谨、缓解幻觉</td>\n<td>成本较高、写作速度较慢</td>\n<td>深度研究、报告生成</td>\n</tr>\n<tr>\n<td>CoMind</td>\n<td>多智能体社区协作</td>\n<td>方案探索广、跨模态泛化强、真人竞赛验证</td>\n<td>通信开销大、成本较高</td>\n<td>机器学习工程、竞赛方案开发</td>\n</tr>\n</tbody>\n</table></div>\n<p>__________________________________________________</p>\n<h2>四、技术趋势与展望</h2>\n<p><strong>当前趋势</strong></p>\n<p>从固定工作流到动态合成：FlowSearcher和AGENTFLOW都表明，预定义ReAct循环正在让位于自适应规划。未来的Agent应该像人类一样\"看菜下饭\"——复杂任务用复杂流程，简单任务用简单流程。</p>\n<p>从结果奖励到过程奖励：E-GRPO的实体感知奖励是过程奖励的一种实现。越来越多研究者意识到，稀疏的结果奖励浪费了大量学习信号，过程监督是提升Agent训练效率的关键。</p>\n<p>从单体智能体到多智能体协作：WebWeaver的Planner-Writer分离和CoMind的模拟社区都指向同一个方向——专业分工比单体万能更高效。未来复杂任务很可能由多个专业化Agent协作完成。</p>\n<p><strong>从固定工作流到动态合成</strong>：FlowSearcher和AGENTFLOW都表明，预定义ReAct循环正在让位于自适应规划。未来的Agent应该像人类一样\"看菜下饭\"——复杂任务用复杂流程，简单任务用简单流程。</p>\n<p><strong>从结果奖励到过程奖励</strong>：E-GRPO的实体感知奖励是过程奖励的一种实现。越来越多研究者意识到，稀疏的结果奖励浪费了大量学习信号，过程监督是提升Agent训练效率的关键。</p>\n<p><strong>从单体智能体到多智能体协作</strong>：WebWeaver的Planner-Writer分离和CoMind的模拟社区都指向同一个方向——专业分工比单体万能更高效。未来复杂任务很可能由多个专业化Agent协作完成。</p>\n<p><strong>值得关注的新方向</strong></p>\n<p>工作流的可解释性与可编辑性：FlowSearcher生成的DAG工作流虽然灵活，但用户很难理解和干预。如果Agent能生成人类可读的工作流计划并允许用户修改，人机协作效率会大幅提升。</p>\n<p>跨Agent经验共享：CoMind社区内的经验只在当前竞赛中流转。如果不同Agent系统之间能共享工具使用经验（比如一个统一的工作流记忆库），整个生态的进化速度会呈指数级增长。</p>\n<p><strong>工作流的可解释性与可编辑性</strong>：FlowSearcher生成的DAG工作流虽然灵活，但用户很难理解和干预。如果Agent能生成人类可读的工作流计划并允许用户修改，人机协作效率会大幅提升。</p>\n<p><strong>跨Agent经验共享</strong>：CoMind社区内的经验只在当前竞赛中流转。如果不同Agent系统之间能共享工具使用经验（比如一个统一的工作流记忆库），整个生态的进化速度会呈指数级增长。</p>\n<p>__________________________________________________</p>\n<h2>写在最后</h2>\n<p>智能体系统规划这个方向的共同特点是：大家都在试图让Agent从\"按剧本演出\"走向\"即兴发挥\"。FlowSearcher用记忆合成动态剧本，AGENTFLOW让Agent在演出中实时学习，E-GRPO改进了演员的训练方法，WebWeaver把导演和编剧分开以提升作品质量，CoMind则搭建了一个剧团而非培养单个演员。五条路径各有侧重，但目标一致——让AI Agent真正具备灵活规划、精准执行、持续进化的能力。</p>\n<p>__________________________________________________</p>\n<h2>关注我们</h2>\n<p>欢迎关注公众号：<strong>nightli的小记</strong></p>"
    }
  ],
  "graph": {
    "nodes": [
      {
        "id": "mrkl",
        "x": 80,
        "y": 80,
        "category": "foundation"
      },
      {
        "id": "react",
        "x": 180,
        "y": 80,
        "category": "foundation"
      },
      {
        "id": "toolformer",
        "x": 300,
        "y": 180,
        "category": "learning"
      },
      {
        "id": "hugginggpt",
        "x": 360,
        "y": 290,
        "category": "orchestration"
      },
      {
        "id": "api_bank",
        "x": 430,
        "y": 510,
        "category": "evaluation"
      },
      {
        "id": "gorilla",
        "x": 500,
        "y": 180,
        "category": "learning"
      },
      {
        "id": "toolllm",
        "x": 620,
        "y": 180,
        "category": "learning"
      },
      {
        "id": "llm_compiler",
        "x": 680,
        "y": 290,
        "category": "orchestration"
      },
      {
        "id": "tau_bench",
        "x": 760,
        "y": 510,
        "category": "evaluation"
      },
      {
        "id": "toolsandbox",
        "x": 840,
        "y": 510,
        "category": "evaluation"
      },
      {
        "id": "toolace",
        "x": 920,
        "y": 180,
        "category": "learning"
      },
      {
        "id": "mcp",
        "x": 980,
        "y": 400,
        "category": "protocol"
      },
      {
        "id": "acebench",
        "x": 1080,
        "y": 510,
        "category": "evaluation"
      },
      {
        "id": "bfcl",
        "x": 1160,
        "y": 510,
        "category": "evaluation"
      },
      {
        "id": "tau2_bench",
        "x": 1240,
        "y": 510,
        "category": "evaluation"
      },
      {
        "id": "vrrl_agents",
        "x": 1320,
        "y": 180,
        "category": "learning"
      },
      {
        "id": "intent",
        "x": 1380,
        "y": 290,
        "category": "orchestration"
      },
      {
        "id": "cm2",
        "x": 1440,
        "y": 180,
        "category": "learning"
      },
      {
        "id": "asyncfc",
        "x": 1500,
        "y": 290,
        "category": "orchestration"
      },
      {
        "id": "apb",
        "x": 1580,
        "y": 510,
        "category": "evaluation"
      }
    ],
    "edges": [
      {
        "from": "mrkl",
        "to": "toolformer",
        "label": "可学调用"
      },
      {
        "from": "mrkl",
        "to": "hugginggpt",
        "label": "模块控制"
      },
      {
        "from": "react",
        "to": "llm_compiler",
        "label": "并行编排"
      },
      {
        "from": "toolformer",
        "to": "api_bank",
        "label": "建立基准"
      },
      {
        "from": "toolformer",
        "to": "gorilla",
        "label": "精准调参"
      },
      {
        "from": "gorilla",
        "to": "toolllm",
        "label": "万级扩展"
      },
      {
        "from": "api_bank",
        "to": "tau_bench",
        "label": "面向用户"
      },
      {
        "from": "api_bank",
        "to": "toolsandbox",
        "label": "状态执行"
      },
      {
        "from": "hugginggpt",
        "to": "llm_compiler",
        "label": "显式编排"
      },
      {
        "from": "toolllm",
        "to": "toolace",
        "label": "数据自演"
      },
      {
        "from": "gorilla",
        "to": "mcp",
        "label": "接口统一"
      },
      {
        "from": "toolsandbox",
        "to": "acebench",
        "label": "细分误差"
      },
      {
        "from": "gorilla",
        "to": "bfcl",
        "label": "函数评测"
      },
      {
        "from": "tau_bench",
        "to": "tau2_bench",
        "label": "双控环境"
      },
      {
        "from": "toolace",
        "to": "vrrl_agents",
        "label": "合成+RL"
      },
      {
        "from": "vrrl_agents",
        "to": "cm2",
        "label": "开放奖励"
      },
      {
        "from": "llm_compiler",
        "to": "intent",
        "label": "预算规划"
      },
      {
        "from": "llm_compiler",
        "to": "asyncfc",
        "label": "异步执行"
      },
      {
        "from": "tau2_bench",
        "to": "apb",
        "label": "前置诊断"
      }
    ],
    "milestones": [
      "toolformer",
      "mcp",
      "bfcl"
    ]
  },
  "algos": [
    {
      "id": "mrkl",
      "num": 1,
      "name": "MRKL",
      "fullName": "模块化推理知识与语言系统 (MRKL Systems)",
      "year": "2022.05",
      "org": "AI21 Labs",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2205.00445",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "把专家模块接入LM形成可路由系统",
      "summary": "MRKL 提出了一种 Router + Experts 的神经符号架构，让语言模型把自然语言请求路由到通用语言模块或符号专家模块，从而系统性补足 LLM 在最新知识、私有数据和精确计算上的短板。",
      "keyPoints": [
        "提出 <strong>MRKL Systems</strong> 架构：由轻量 Router 负责路由，后接可扩展的 Neural Experts 与 Symbolic Experts。",
        "系统总结了纯 LLM 的四类核心缺陷：<strong>无当前信息、无私有数据、精确推理不稳、能力扩展导致模型爆炸</strong>。",
        "给出 <strong>安全回落机制</strong>：当没有匹配专家时，仍可退回通用语言模型回答，避免系统不可用。",
        "把“自然语言到符号模块参数提取”作为核心接口问题，并用 <strong>算术计算</strong> 做神经到符号跨越的测试床。",
        "比较了从规则提取到 text-to-text 提取的多种参数化方法，展示了结构化接口设计对工具调用稳定性的决定性作用。"
      ],
      "detail": "<p><img alt=\"MRKL 架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2205.00445/assets/x1.png\" /></p>\n<p><em>图：MRKL 系统总览。输入问题先进入 Router，再被分发到通用语言模块或符号专家模块，最后由系统返回答案。</em></p>\n<h5>动机与背景</h5>\n<p>MRKL 论文的切入点非常直接：即使大语言模型语言能力很强，它们在一些看似基础的问题上仍然会稳定失误。论文把这类缺陷归纳为四类：</p>\n<ul>\n<li><strong>缺乏当前信息</strong>：训练语料有时间截断，模型不知道最新汇率、最新新闻、当前日期。</li>\n<li><strong>缺乏私有知识</strong>：企业数据库、个人信息、实时系统状态不在预训练语料里。</li>\n<li><strong>精确推理不可靠</strong>：两位数加法可能还行，四位数以上就可能自信地产生错误结果。</li>\n<li><strong>模型爆炸问题</strong>：每引入一类新能力就继续端到端扩模型或重训，成本高且容易遗忘旧能力。</li>\n</ul>\n<p>MRKL 的核心判断是：这些问题不是“再把模型做大一点”就能优雅解决的，而应该把系统拆成多个专长模块，让语言模型只负责理解与协调，把计算、检索、数据库访问等任务交给更合适的专家。</p>\n<h5>核心机制：Router + Experts</h5>\n<p>MRKL 可以理解为一种早期的“工具调用蓝图”：</p>\n<ul>\n<li><strong>Router</strong>：读入自然语言问题，判断应该调用哪个专家模块。</li>\n<li><strong>Neural Experts</strong>：比如通用语言模型、专用小模型，负责开放式语言理解和生成。</li>\n<li><strong>Symbolic Experts</strong>：比如计算器、数据库查询器、搜索接口、外部 API，负责精确和可验证的操作。</li>\n</ul>\n<p>它不是把所有能力都塞进一个巨大模型里，而是让系统执行：</p>\n<pre><code class=\"language-python\">def mrkl_answer(query):\n    expert = router.select(query)\n    if expert.type == &quot;symbolic&quot;:\n        args = extract_structured_args(query, expert.schema)\n        result = expert.run(args)\n        return verbalize(result)\n    return neural_expert.generate(query)\n</code></pre>\n<p>这里真正困难的不是“调 API”这件事，而是 <strong>从自然语言里稳定提取符号模块所需的离散参数</strong>。如果参数抽错，后面的符号模块再精确也没用。</p>\n<div class=\"key-point\">💡 关键：MRKL 的创新重点不只是“模块化”三个字，而是把“语言理解”和“精确执行”硬拆开，并把两者之间的接口问题单独提出。</div>\n<h5>论文如何验证：用算术做神经-符号接口测试床</h5>\n<p>论文没有直接做一个复杂通用 Agent，而是选择了 <strong>算术计算</strong> 作为最干净的测试案例。原因很合理：</p>\n<ul>\n<li>算术的正确答案完全可验证；</li>\n<li>语言模型在简单算术上似乎“有点会”，但一上复杂位数就容易崩；</li>\n<li>算术调用需要把自然语言转成结构化表达式，非常适合研究参数提取。</li>\n</ul>\n<p>作者构造了不同问题格式，例如：</p>\n<ul>\n<li>纯表达式：<code>124+235</code></li>\n<li>半结构化：<code>124 plus 235</code></li>\n<li>自然语言模板：<code>What is 124 plus 235?</code></li>\n<li>更开放的叙述式问题</li>\n</ul>\n<p>然后比较多种参数提取方案，包括：</p>\n<ul>\n<li>直接让 LM 端到端作答；</li>\n<li>简单规则抽取；</li>\n<li>基于问题模板的格式化抽取；</li>\n<li>seq2seq 抽取；</li>\n<li>句法分析抽取；</li>\n<li>text-to-text 风格的提取模型。</li>\n</ul>\n<p>结果显示，在结构较规整的格式下，<strong>简单格式化提取就能达到接近完美的正确率</strong>；真正困难的是完全自然语言、尤其带语义歧义的输入。这说明工具调用系统的质量，很多时候取决于接口层设计，而不是底层大模型本身。</p>\n<h5>与后续工具调用框架的关系</h5>\n<p>MRKL 对后续工作的影响很深：</p>\n<ul>\n<li>它把 <strong>“调用外部工具”</strong> 从临时 prompt 技巧，上升成了系统架构问题。</li>\n<li>它明确区分了 <strong>路由、参数提取、执行、回落</strong> 这些子问题。</li>\n<li>后面的 Toolformer、Gorilla、Function Calling、ReAct、LangChain，本质上都在沿着 MRKL 这条路继续自动化或工程化。</li>\n</ul>\n<p>从今天回看，MRKL 还没有完整讨论多步规划、长链调用和交互式环境，但它已经把“LLM 不必独自完成所有事情”这个范式讲清楚了。</p>\n<div class=\"warn-box\">⚠️ 注意：MRKL 论文对真正的 Router 训练与多跳组合执行讨论并不充分，更多是在提出范式并用算术案例证明“神经到符号接口是可行的”。</div>",
      "quiz": {
        "q": "MRKL 中引入 Symbolic Expert 的最核心目的是什么？",
        "options": [
          "让语言模型生成更长的回答",
          "把所有能力继续压缩回单一模型参数中",
          "把精确计算、数据库访问等高可靠任务交给更合适的外部模块",
          "避免 Router 参与任何决策"
        ],
        "answer": 2,
        "explain": "MRKL 的核心思想就是让 LM 负责理解与路由，让计算器、数据库、API 等符号模块负责精确执行，从而补足纯 LLM 的鲁棒性缺陷。"
      }
    },
    {
      "id": "react",
      "num": 2,
      "name": "ReAct",
      "fullName": "推理-行动协同 (ReAct)",
      "year": "2022.10",
      "org": "Princeton/Google",
      "parent": "—",
      "paperUrl": "https://arxiv.org/abs/2210.03629",
      "projectUrl": "",
      "category": "foundation",
      "motivation": "交错思考与行动驱动工具闭环",
      "summary": "ReAct 提出**在语言模型的行动空间中注入“思维（thought）”**——一种不影响外部环境、仅用于推理的语言动作——通过交替生成 Thought-Action-Observation 三元组，实现推理与行动的协同，在知识密集问答和交互决策两类任务上显著降低了幻觉并提升了可解释性。",
      "keyPoints": [
        "<strong>动作空间扩展</strong>：将策略的动作空间从纯环境动作 𝒜 扩展为 𝒜 ∪ ℒ（ℒ 为语言空间），其中“思维”不产生环境反馈，仅通过推理当前上下文更新内部状态。",
        "<strong>两种思维模式</strong>：推理任务采用<strong>密集思维</strong>（每步行动前都有思维），决策任务采用<strong>稀疏思维</strong>（模型自主决定何时插入思维），体现框架的灵活性。",
        "<strong>Prompt 即策略</strong>：利用 PaLM-540B 的 few-shot 能力，人工编写含 Thought-Action-Observation 的完整轨迹作为 in-context 示例（1-6个），无需额外训练。",
        "<strong>幻觉大幅降低</strong>：HotPotQA 上 ReAct 失败模式中幻觉率 0%，而 CoT 高达 56%；成功模式中正确率 94% vs 86%。",
        "<strong>微调潜力巨大</strong>：PaLM-8B 微调 ReAct 即可超越 PaLM-540B 所有 Prompt 方法，证明外部知识交互是可迁移的通用技能。",
        "<strong>人类可编辑</strong>：思维以自然语言呈现，人类可随时插入/修改思维来纠正 Agent 行为，实现实时可控性。"
      ],
      "detail": "<p><img alt=\"ReAct 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2210.03629/assets/x1.png\" />\n<em>图：ReAct 的核心框架或评测示意。</em></p>\n<h5>1. 形式化定义：增强动作空间</h5>\n<p><strong>原始 MDP 问题</strong>：给定上下文 $c_t = (o_1, a_1, \\cdots, o_{t-1}, a_{t-1}, o_t)$，策略需学习 $c_t \\mapsto a_t$ 的映射。当推理链复杂时（如多跳 QA），该映射高度隐式且极易出错。</p>\n<p><strong>ReAct 核心创新</strong>：将动作空间扩展为 $\\hat{\\mathcal{A}} = \\mathcal{A} \\cup \\mathcal{L}$，其中 $\\mathcal{L}$ 为无限的语言空间。一个“思维” $\\hat{a}<em t_1=\"t+1\">t \\in \\mathcal{L}$：\n- <strong>不影响外部环境</strong>（无 observation 反馈）\n- <strong>更新内部上下文</strong>：$c</em>_t)$\n- } = (c_t, \\hat{a<strong>用途多样</strong>：分解任务目标、注入常识知识、提取关键信息、跟踪进度、处理异常、调整计划</p>\n<pre><code>┌─────────────────────────────────────────────────────────────────┐\n│                    ReAct 循环 (密集模式)                          │\n├─────────────────────────────────────────────────────────────────┤\n│                                                                  │\n│  for each step t:                                                │\n│      Thought_t  ← 推理当前上下文 c_t                              │\n│      Action_t   ← 基于 Thought_t 生成环境动作                     │\n│      Obs_t      ← 环境返回观察结果                               │\n│      c_{t+1}    ← c_t ∪ {Thought_t, Action_t, Obs_t}            │\n│                                                                  │\n│  关键性质：                                                       │\n│  • Thought ∈ ℒ 不影响环境，仅推进内部推理链                       │\n│  • Action  ∈ 𝒜 产生真实的 Observation                            │\n│  • 稀疏模式下，Thought 由模型自主决定何时插入                      │\n│                                                                  │\n└─────────────────────────────────────────────────────────────────┘\n</code></pre>\n<h5>2. 实现方式：Few-Shot Prompt 即策略</h5>\n<p>ReAct 不对模型参数做任何修改，完全依赖<strong>冻结的大语言模型（PaLM-540B）</strong>的 few-shot in-context learning 能力。</p>\n<p><strong>Prompt 构建流程</strong>：\n1. 从训练集中随机选取 1-6 条任务实例（HotpotQA 用 6，FEVER 用 3，ALFWorld 用 6）\n2. 人类标注者<strong>手动编写完整的 Thought-Action-Observation 轨迹</strong>\n3. 这些轨迹以自然语言形式拼接为 few-shot prompt\n4. 测试时模型按相同格式生成推理-行动-观察序列</p>\n<p><strong>思维类型的多样性</strong>（单条轨迹中可能包含多种）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>思维类型</th>\n<th>示例</th>\n<th>作用</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>任务分解</td>\n<td>\"I need to search x, find y, then find z\"</td>\n<td>制定搜索计划</td>\n</tr>\n<tr>\n<td>信息提取</td>\n<td>\"x was started in 1844\"</td>\n<td>从观察中提炼关键事实</td>\n</tr>\n<tr>\n<td>常识推理</td>\n<td>\"x is not y, so z must instead be…\"</td>\n<td>基于外部知识推理</td>\n</tr>\n<tr>\n<td>算术推理</td>\n<td>\"1844 &lt; 1989\"</td>\n<td>数值比较与计算</td>\n</tr>\n<tr>\n<td>搜索重规划</td>\n<td>\"maybe I can search/look up x instead\"</td>\n<td>失败后的策略调整</td>\n</tr>\n<tr>\n<td>最终合成</td>\n<td>\"…so the answer is x\"</td>\n<td>综合所有信息给出答案</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>密集 vs 稀疏模式</strong>：\n- <strong>密集模式</strong>（知识推理任务）：每一步环境动作前都插入 Thought → Thought-Action-Observation 严格交替\n- <strong>稀疏模式</strong>（决策任务）：模型自主决定插入 Thought 的位置和频率，在大量动作中仅在关键节点推理</p>\n<h5>3. 关键实验发现</h5>\n<p><strong>主实验（HotpotQA &amp; FEVER）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th style=\"text-align: center;\">HotpotQA (EM)</th>\n<th style=\"text-align: center;\">FEVER (Acc)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Standard Prompt</td>\n<td style=\"text-align: center;\">25.7</td>\n<td style=\"text-align: center;\">57.1</td>\n</tr>\n<tr>\n<td>CoT (Chain-of-Thought)</td>\n<td style=\"text-align: center;\"><strong>29.4</strong></td>\n<td style=\"text-align: center;\">56.3</td>\n</tr>\n<tr>\n<td>Act (纯行动)</td>\n<td style=\"text-align: center;\">25.7</td>\n<td style=\"text-align: center;\">58.9</td>\n</tr>\n<tr>\n<td>ReAct</td>\n<td style=\"text-align: center;\">27.4</td>\n<td style=\"text-align: center;\"><strong>60.9</strong></td>\n</tr>\n<tr>\n<td>ReAct→CoT-SC (3-5 samples)</td>\n<td style=\"text-align: center;\"><strong>33.8</strong>†</td>\n<td style=\"text-align: center;\">62.9</td>\n</tr>\n<tr>\n<td>CoT-SC→ReAct (3-5 samples)</td>\n<td style=\"text-align: center;\">32.9</td>\n<td style=\"text-align: center;\"><strong>64.6</strong>†</td>\n</tr>\n</tbody>\n</table></div>\n<p>† 达到 CoT-SC 需 21 个 sample 的性能水平，仅用 3-5 个样本</p>\n<p><strong>失败模式分析（HotpotQA 200条随机轨迹）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>类别</th>\n<th style=\"text-align: center;\">ReAct</th>\n<th style=\"text-align: center;\">CoT</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>成功-正确推理</strong></td>\n<td style=\"text-align: center;\">94%</td>\n<td style=\"text-align: center;\">86%</td>\n</tr>\n<tr>\n<td><strong>成功-幻觉</strong></td>\n<td style=\"text-align: center;\">6%</td>\n<td style=\"text-align: center;\">14%</td>\n</tr>\n<tr>\n<td><strong>失败-推理错误</strong></td>\n<td style=\"text-align: center;\">47%</td>\n<td style=\"text-align: center;\">16%</td>\n</tr>\n<tr>\n<td><strong>失败-搜索无结果</strong></td>\n<td style=\"text-align: center;\">23%</td>\n<td style=\"text-align: center;\">-</td>\n</tr>\n<tr>\n<td><strong>失败-幻觉</strong></td>\n<td style=\"text-align: center;\"><strong>0%</strong></td>\n<td style=\"text-align: center;\"><strong>56%</strong></td>\n</tr>\n<tr>\n<td><strong>失败-标签歧义</strong></td>\n<td style=\"text-align: center;\">29%</td>\n<td style=\"text-align: center;\">28%</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>核心洞察</strong>：</p>\n<blockquote>\n<p>ReAct 通过引入外部知识检索，<strong>完全消除了 CoT 中最大的失败源——幻觉（56%→0%）</strong>。代价是推理的灵活性降低（推理错误 47% vs 16%），以及检索失败时的恢复困难（23% 因搜索无结果失败）。这体现了<strong>事实性（factuality）与灵活性（flexibility）之间的基本权衡</strong>，启发后续 ReAct+CoT-SC 的组合策略。</p>\n</blockquote>\n<p><strong>微调 Scaling（HotpotQA PaLM-8B/62B）</strong>：\n- PaLM-8B 微调 ReAct &gt; PaLM-62B 所有 Prompt 方法\n- PaLM-62B 微调 ReAct &gt; PaLM-540B 所有 Prompt 方法\n- 仅需 <strong>3000 条标注数据</strong>即可实现大幅超越\n- 关键结论：微调教给模型的是\"如何与 Wikipedia 交互\"这一<strong>可泛化的技能</strong>，而非记忆事实——因此微调 Act 和 ReAct 远优于微调 CoT</p>\n<p><strong>决策任务（ALFWorld &amp; WebShop）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>任务</th>\n<th style=\"text-align: center;\">ReAct</th>\n<th style=\"text-align: center;\">Act (纯行动)</th>\n<th style=\"text-align: center;\">BUTLER (SOTA)</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>ALFWorld (6 tasks avg)</td>\n<td style=\"text-align: center;\"><strong>71%</strong></td>\n<td style=\"text-align: center;\">45%</td>\n<td style=\"text-align: center;\">37% (专家系统)</td>\n</tr>\n<tr>\n<td>WebShop (success rate)</td>\n<td style=\"text-align: center;\"><strong>66.6%</strong></td>\n<td style=\"text-align: center;\">58.0%</td>\n<td style=\"text-align: center;\">59.8% (IL + RL)</td>\n</tr>\n</tbody>\n</table></div>\n<ul>\n<li>ALFWorld：ReAct 仅用 <strong>6</strong> 个 in-context 示例即超越领域专用专家系统 BUTLER</li>\n<li>WebShop：ReAct 超越 Imitation Learning + RL 的 1100 万训练样本模型</li>\n<li>稀疏思维模式下，模型学会在遇到歧义观察时才插入思维进行推理</li>\n</ul>\n<h5>4. 人类可控性</h5>\n<p>如 Figure 5 所示，由于思维以自然语言呈现，人类可以在推理过程的任意节点<strong>插入或编辑 Thought</strong>，直接修正 Agent 行为。例如：\n- Agent 陷入循环时，插入 \"You have already searched... try looking up...\"\n- Agent 忽略关键信息时，插入 \"The observation says... this means...\"\n- 这种<strong>运行时编辑</strong>无需重新训练，实现了对黑箱模型的即时行为修正</p>\n<h5>5. 理论意义：为什么 ReAct 有效？</h5>\n<ol>\n<li><strong>认知科学对齐</strong>：人类的决策过程天然包含“内部独白”（inner monologue），ReAct 让模型模拟这一机制</li>\n<li><strong>接地性（Groundedness）</strong>：思维由环境观察驱动，反过来指导行动，形成“感知→推理→行动”的闭环，避免纯推理的空想</li>\n<li><strong>组合泛化</strong>：Reasoning 和 Acting 两种技能在 ReAct 框架中解耦又协同，使模型能在需要时调用内部知识，在必要时查询外部环境</li>\n<li><strong>可诊断性</strong>：思维链为模型行为提供了逐级解释，使失败分析从“黑箱猜测”变为“逻辑追踪”</li>\n</ol>\n<h5>6. 局限与未来方向</h5>\n<ul>\n<li><strong>推理错误增加</strong>：思维-行动的结构化约束降低了 CoT 的自由推理能力，47% 的失败源于推理错误</li>\n<li><strong>检索依赖</strong>：当搜索 API 返回无用信息时（23% 失败），模型难以恢复——这是接地性的代价</li>\n<li><strong>贪心解码缺陷</strong>：观察到的“重复生成”错误可能与贪心解码有关，beam search 等策略或可缓解</li>\n<li><strong>跨任务泛化</strong>：本文仅测试了 Wiki API 和文本游戏两类环境，更丰富的环境交互（如代码执行、多模态感知）仍有待探索</li>\n</ul>",
      "quiz": {
        "q": "ReAct 相比纯 Chain-of-Thought，为什么更容易降低工具使用场景中的幻觉？",
        "options": [
          "因为 ReAct 会禁止模型输出自然语言推理",
          "因为 ReAct 让推理过程不断接受外部观察反馈，避免长期脱离环境空想",
          "因为 ReAct 完全不需要 prompt 示例",
          "因为 ReAct 只适用于单步检索任务"
        ],
        "answer": 1,
        "explain": "ReAct 的 Thought-Action-Observation 闭环让模型持续被环境反馈校正，因此比纯 CoT 更不容易在错误假设上一路推理下去。"
      }
    },
    {
      "id": "toolformer",
      "num": 3,
      "name": "Toolformer",
      "fullName": "自学工具调用模型 (Toolformer)",
      "year": "2023.02",
      "org": "Meta AI",
      "parent": "mrkl",
      "paperUrl": "https://arxiv.org/abs/2302.04761",
      "projectUrl": "",
      "category": "learning",
      "motivation": "自监督学会何时调用何种API",
      "summary": "Toolformer 提出了一种自监督学习方法，让LLM在无人工标注的情况下自主学会决定何时调用何种外部工具（计算器、问答系统、搜索引擎、翻译、日历），通过在文本中插入API调用标记并基于困惑度损失自筛选高质量调用，实现零样本工具使用能力的涌现。",
      "keyPoints": [
        "<strong>核心问题</strong>：大语言模型在数学计算、事实查询、时间感知等能力上存在固有局限，现有few-shot让LLM调用工具但依赖大量人工标注和精心设计的prompt，难以规模化——Toolformer希望让模型\"自学工具调用\"。",
        "<strong>自监督数据生成</strong>：用少量few-shot示例引导LM在原始预训练语料中随机插入API调用（格式：<code>&lt;API&gt; 调用文本 &lt;/API&gt;</code> → 填充API结果），生成大量候选\"增强语料\"。",
        "<strong>困惑度筛选机制</strong>：核心过滤函数 <code>w = min(P(x|z), P(x|z,r)) / P(x|ε)</code>，衡量插入API调用是否真正降低了后续token的生成困惑度。仅保留API调用降低困惑度的样本——这构成自监督训练信号。",
        "<strong>工具API集</strong>：5类API——计算器（四则运算）、维基百科搜索（返回短摘要）、问答系统（Atlas）、翻译器（en↔de/zh/fr等）、日历（返回日期）。每类API用独立token标识。",
        "<strong>训练方式</strong>：在增强后的语料上，用标准语言模型目标（next token prediction）对预训练GPT-J（6B）进行微调。模型在API调用token处学习决定是否调用；在API输出token处学习消化调用结果。",
        "<strong>关键结果</strong>：Toolformer在零样本或少样本设置下，在数学、问答、翻译、事实性、时间推理等下游任务上显著优于同规模的纯语言模型；特别是数学和事实性任务有大幅提升；且几乎不影响模型在其他标准NLP任务上的表现。",
        "<strong>消融与发现</strong>：自监督筛选至关重要，随机插入API调用会损害性能；模型同时学会了\"调用时机\"与\"调用后的信息融合\"两种能力；去偏采样策略（重新加权使不同工具的使用频率均衡）提升了训练稳定性。"
      ],
      "detail": "<pre><code class=\"language-python\"># 工具调用代理的抽象流程\nselected = router.pick(query, tools)\nobservation = executor.run(selected)\nreturn synthesizer.answer(query, observation)\n</code></pre>\n<p><img alt=\"Toolformer 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2302.04761/assets/x1.png\" />\n<em>图：Toolformer 的核心框架或评测示意。</em></p>\n<p><strong>1. 方法总览：三步走</strong>\n- Step 1 — 候选生成：从预训练语料C中采样，用少量标注的few-shot prompt（约25条/API）让LM（M）在文本中插入API调用。每个位置最多采样k个候选API调用。API调用的格式为 <code>&lt;API&gt; param1, param2 &lt;/API&gt;</code>，然后在执行API后获得结果r，插入在 <code>&lt;/API&gt;</code> 之后用 <code>&lt;API&gt; 结果 &lt;/API&gt;</code> 标记。最终得到形式上\"文本中夹杂API调用和结果\"的增强版语料。\n- Step 2 — 自监督过滤：对每个候选增强文本，比较三个版本的token概率：①使用空token ε作为基线；②加入API调用但无实际结果（z）；③加入API完整调用并有执行结果（r）。仅当有结果的token概率同时优于无API和无语义结果两者时（取min加权），该候选被保留。这使得模型只学习那些\"真正有用\"的API调用模式。\n- Step 3 — 模型微调：在保留下来的高质量增强语料上，以标准语言建模损失微调M，新语料占总量的比例一般不超过~2%（数据效率极高）。训练过程不引入额外辅助损失，所有学习信号来自自监督过滤。</p>\n<p><strong>2. 工具API的实现细节</strong>\n- 计算器：基于Python eval，输入为数学表达式字符串。约25个few-shot示例中包含加减乘除等基础运算的上下文。\n- 维基百科搜索：输入查询字符串返回BM25检索的前几条文本，约25个示例教模型将疑问转化为简洁查询。\n- QA系统（Atlas）：通过检索增强的QA模型回答结构化问题；few-shot示例展示了对知识的\"查证\"行为。\n- 翻译：用LaBSE+fast-align构建的简单翻译模型，在英语&lt;-&gt;目标语言间翻译；示例包含成语、专有名词等典型需翻译场景。\n- 日历：返回日期文本；few-shot示例捕获模型在时间相关查询时\"何时需要调用日期API\"的模式。\n- 重要：所有API的few-shot示例由研究者手工编写但数量极少（每种仅~25条），关键的自监督扩展由模型在百万级原始语料上自动完成。</p>\n<p><strong>3. 实验设置</strong>\n- 基座模型：GPT-J 6B（6亿参数，在The Pile数据集上预训练）；\n- 增强语料来源：CCNet（来自CommonCrawl的网页文本），采样约1300万文档，每个API调用插入后过滤，保留约2%左右的样本；\n- 下游评测：\n  - LAMA（知识探测）、数学应用题（ASDiv, GSM8K, SVAMP, MAWPS）、QA（Web Questions, Natural Questions, TriviaQA）、翻译（WMT en↔de, en↔zh）、时间推理（TempLAMA）；\n  - 评测方式：纯零样本或使用标准少样本prompt，但prompt中<strong>不包含API调用指令</strong>——模型需要自主判断是否调用。\n- 关键指标：精度/准确率（数学、问答）、F1/EM、困惑度。</p>\n<p><strong>4. 主要实验结果</strong>\n- 数学基准（ASDiv等）：准确率从纯GPT-J的~10-15%提升到Toolformer的~50-70%，在简单算术上有质的飞跃。\n- 事实性知识（LAMA准确性）：提升尤其显著，从约30%到约70%。\n- 问答：在NQ/TriviaQA上零样本性能提升明显（+5~15点），但不如增加模型规模的效果大；这表明\"自学工具调用\"在知识密集型任务上有上限。\n- 翻译：提升了低资源方向的性能，但并非大幅跃升，尤其在已有基本翻译能力的语言对（如en→de）上提升有限。\n- 时间推理（TempLAMA）：提升明显，因为日历API提供了准确的时态锚定信息。\n- 负效应检查：在标准NLU基准（HellaSwag, StoryCloze等）上，Toolformer基本保持了GPT-J的性能，说明\"工具调用能力\"并未以牺牲通用语言能力为代价。</p>\n<p><strong>5. 消融实验关键结论</strong>\n- 自监督过滤是关键：直接使用随机插入的API调用而不做困惑度筛选，会导致下游任务性能下降（甚至低于纯基线），说明\"乱调用\"的噪声大于收益。\n- 数据效率极高：仅用约2%的增强语料微调即可获得大部分收益；继续增大增强语料比例到5%收益递减。\n- 工具多样性有价值：每个工具贡献的主要维度不同（计算器→数学、搜索→事实、日历→时间），但移除任一工具不影响模型使用其他工具的能力——这表明\"工具调用技能\"在不同API间具有<strong>迁移性</strong>，可能源于模型学会了\"元技能\"（何时外部化处理+如何融合API结果）。\n- 去偏采样：训练时对不同API类型的样本做re-weight以保持均衡，否则高频工具（如搜索）会主导学习信号。\n- 模型规模影响：在GPT-2不同大小上的对比实验表明，只有较大模型（≥775M参数）才能有效从自监督工具学习中受益，小模型无法稳定学习何时调用API。</p>\n<p><strong>6. 局限与后续工作</strong>\n- API格式高度结构化（依赖固定标记<code>&lt;API&gt;</code>），在真实开放世界中API接口多样，不具可迁移性；\n- 仅验证了文本生成场景中调用API，未涉及多模态或交互式环境；\n- 训练和推理中存在API调用的计算开销（每个候选调用都需实际执行API并前向传播对比困惑度）；\n- 后续工作Gorilla/Berkeley Function Calling等沿用了类似的\"function calling\"范式，证明了此方向的深远影响。</p>\n<p><strong>7. 对Agent领域的意义</strong>\nToolformer是\"语言模型自学工具使用\"方向的开创性工作，奠定了如下基础思想：\n- 语言模型可以通过困惑度信号自主发现\"何时需要外部工具\"的数据模式；\n- 少量few-shot种子+自监督扩展是一种高效的数据构造范式；\n- API调用可以嵌入到token序列中，以统一的自回归语言建模框架完成工具调用的决策和执行；\n- 这直接启发了后续的ReAct、MRKL System、Gorilla、Function Calling等一系列Agent工具使用框架。</p>",
      "quiz": {
        "q": "Toolformer 用什么信号决定某个候选 API 调用是否值得保留进训练数据？",
        "options": [
          "只看 API 返回文本是否足够长",
          "只看 few-shot 示例里是否出现过同类调用",
          "看插入 API 调用和结果后，后续 token 的语言建模困惑度是否下降",
          "让人工逐条审核 API 调用是否合理"
        ],
        "answer": 2,
        "explain": "Toolformer 的核心是基于语言建模损失筛选调用样本，只有真正能降低后续 token 困惑度的 API 调用才会保留。"
      }
    },
    {
      "id": "hugginggpt",
      "num": 4,
      "name": "HuggingGPT",
      "fullName": "模型协同调度器 (HuggingGPT)",
      "year": "2023.03",
      "org": "Zhejiang University",
      "parent": "mrkl",
      "paperUrl": "https://arxiv.org/abs/2303.17580",
      "projectUrl": "",
      "category": "orchestration",
      "motivation": "按描述规划并选择外部模型",
      "summary": "HuggingGPT 提出以 ChatGPT 作为核心控制器，将用户请求自动分解为子任务、从 Hugging Face 选取专家模型执行，并将结果汇总为最终回复，从而让 LLM 能够跨模态、跨领域协调数百个专家模型。",
      "keyPoints": [
        "提出一种\"LLM 作为大脑、专家模型作为执行器\"的协作协议，语言成为连接二者的通用接口。",
        "将整个流程划分为四个阶段：任务规划、模型选择、任务执行、响应生成。",
        "任务规划中设计基于规范的 JSON 模板（id、task、dep、args），并通过示例驱动的提示使 LLM 输出结构化任务计划。",
        "模型选择采用上下文内任务-模型匹配机制，利用模型描述作为语言接口，结合下载量排序过滤候选模型。",
        "任务执行阶段通过 <code>&lt;resource&gt;-task_id</code> 符号动态解决资源依赖，支持无依赖任务的并行执行。",
        "响应生成阶段将各专家模型的推理结果整合为连贯的自然语言回答。",
        "在语言、视觉、语音等跨模态任务上验证了框架的有效性，展示了通往通用人工智能的新路径。"
      ],
      "detail": "<p><img alt=\"HuggingGPT 架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/2303.17580/assets/x1.png\" />\n<em>图：语言作为接口连接 LLM（大脑）与专家模型（执行器），实现复杂 AI 任务的自动分解与求解。</em></p>\n<p><img alt=\"HuggingGPT 工作流四阶段\" src=\"https://ar5iv.labs.arxiv.org/html/2303.17580/assets/x2.png\" />\n<em>图：四阶段工作流——任务规划、模型选择、任务执行、响应生成。</em></p>\n<h5>动机与背景</h5>\n<p>传统 AI 模型通常只能处理单一领域或模态的任务。面对需要多步推理、多模态组合的复杂用户请求（例如\"数出图片中有多少物体并为每个物体生成描述\"），缺乏一个能够自动拆解任务并协调多种模型的系统。HuggingGPT 的动机正是利用 LLM 强大的语言理解与推理能力，作为\"总控制器\"动态组合 Hugging Face 社区中的大量专家模型，实现真正的通用任务求解。</p>\n<h5>阶段一：任务规划（Task Planning）</h5>\n<p>LLM 接收用户请求后，首先需要将其拆解为若干结构化子任务。为此，HuggingGPT 设计了一套 <strong>规范驱动 + 示例驱动</strong> 的提示方法：\n1. <strong>Specification-based Instruction</strong>：要求 LLM 按 JSON 格式输出任务列表，每个任务包含 <code>task</code>（任务类型）、<code>id</code>（唯一标识）、<code>dep</code>（依赖的前置任务 id）、<code>args</code>（参数）。模板确保了后续阶段的自动化处理。\n2. <strong>Demonstration-based Parsing</strong>：在提示中加入多个用户请求→任务序列的示例，帮助 LLM 理解任务间的逻辑依赖和执行顺序。\n3. <strong>多轮对话支持</strong>：通过注入聊天历史，使 LLM 能跟踪上下文中的资源，用于任务规划。</p>\n<div class=\"key-point\">💡 关键：任务规划不仅输出任务清单，还明确任务间的资源依赖关系，为后续并行执行奠定基础。</div>\n<h5>阶段二：模型选择（Model Selection）</h5>\n<p>完成规划后，需要为每个子任务从 Hugging Face 海量模型中选出最合适的专家模型：\n- 模型描述作为\"语言接口\"，LLM 通过阅读模型卡（类似 README）理解其功能。\n- <strong>In-context Task-model Assignment</strong>：将任务与候选模型列表一同送入 LLM，让其以\"单选题\"形式选出最佳匹配。\n- 受限于上下文长度，<strong>先按任务类型过滤</strong>，再按模型下载量排序选取 Top-K 候选，有效降低 token 消耗。</p>\n<div class=\"warn-box\">⚠️ 注意：模型选择并非简单基于关键词，LLM 需要理解模型描述中的语义细节，这正是语言接口的优势。</div>\n<h5>阶段三：任务执行（Task Execution）</h5>\n<p>选定模型后，HuggingGPT 自动传参调用模型进行推理。关键的 <strong>资源依赖</strong> 问题通过独创的 <code>&lt;resource&gt;-task_id</code> 符号解决：\n- 在任务规划阶段，若某任务依赖前置任务的输出，则在 <code>args</code> 中写入 <code>&lt;resource&gt;-task_id</code>（例如 <code>&lt;resource&gt;-0</code> 表示依赖 id=0 的任务的输出）。\n- 执行时，系统将该符号替换为前序任务的实际返回结果，再传给模型。\n- 对于无依赖的任务，系统会<strong>并行执行</strong>以提升效率。\n- 模型部署采用混合推理端点，保障计算稳定性和速度。</p>\n<h5>阶段四：响应生成（Response Generation）</h5>\n<p>所有子任务执行完毕后，LLM 汇总各模型的推理结果，结合原始用户请求，生成最终的自然语言回复。这一阶段本质是<strong>多源信息融合</strong>：LLM 不仅要整合结果，还需根据执行日志判断任务是否成功，并进行错误处理或补充说明。</p>\n<h5>与传统方法的对比</h5>\n<ul>\n<li>相比 <strong>统一多模态模型</strong>（如 Flamingo、Kosmos-1），HuggingGPT 无需训练一个万能大模型，而是动态调用现有专家，更灵活且可扩展。</li>\n<li>相比 <strong>Toolformer 等工具调用方法</strong>，HuggingGPT 不仅调用工具，还实现了复杂任务的自动拆解和跨工具协同。</li>\n<li>框架与具体模型解耦：Hugging Face 社区持续新增的模型均可即插即用，实现能力的持续增长。</li>\n</ul>\n<h5>伪代码：HuggingGPT 主流程</h5>\n<pre><code class=\"language-python\">def hugginggpt(user_request, chat_history):\n    # 阶段1: 任务规划\n    task_plan = llm.plan(user_request, chat_history, demonstrations)\n    # task_plan 形如 [{&quot;id&quot;:0,&quot;task&quot;:&quot;image-classification&quot;,&quot;dep&quot;:[],&quot;args&quot;:{...}}, ...]\n\n    # 阶段2: 模型选择\n    for task in task_plan:\n        candidates = huggingface.filter(task.task_type, top_k=10, sort='downloads')\n        task.model = llm.select_model(task, candidates)\n\n    # 阶段3: 任务执行（拓扑顺序、无依赖并行）\n    results = {}\n    for task in topological_order(task_plan):\n        resolved_args = replace_dependencies(task.args, results)  # 替换 &lt;resource&gt;-id\n        if task.model.is_local:\n            output = task.model.run(resolved_args)\n        else:\n            output = remote_invoke(task.model, resolved_args)\n        results[task.id] = output\n\n    # 阶段4: 响应生成\n    final_answer = llm.generate_response(user_request, task_plan, results)\n    return final_answer\n</code></pre>",
      "quiz": {
        "q": "HuggingGPT 在任务执行阶段如何处理子任务间的资源依赖？",
        "options": [
          "将所有任务串行执行，依次传递输出",
          "通过 <resource>-task_id 符号引用，在运行时动态替换为前置任务的输出",
          "要求 LLM 在每步执行前重新推理依赖关系",
          "忽略依赖关系，将所有子任务独立执行"
        ],
        "answer": 1,
        "explain": "HuggingGPT 在任务规划阶段将依赖表示为 `<resource>-task_id`，执行时动态替换，既保证了依赖正确性，又允许无依赖任务并行。"
      }
    },
    {
      "id": "api_bank",
      "num": 5,
      "name": "API-Bank",
      "fullName": "工具增强模型基准库 (API-Bank)",
      "year": "2023.04",
      "org": "Alibaba Group",
      "parent": "toolformer",
      "paperUrl": "https://arxiv.org/abs/2304.08244",
      "projectUrl": "",
      "category": "evaluation",
      "motivation": "首次系统评测规划检索调用三能力",
      "summary": "API-Bank 首次提出规划（Plan）、检索（Retrieve）、调用（Call）三级工具使用能力评估体系，构建含 73 个真实 API 的可执行评测系统和基于五智能体协作的大规模训练集（2,138 API / 1,888 对话），并基于此训练出超越 Alpaca-7B 26 个点的工具增强模型 Lynx，系统揭示了 GPT-4 最强在规划、GPT-3.5 最强在调用、以及幻觉与检索失败是当前核心瓶颈。",
      "keyPoints": [
        "首创三级工具使用能力定义：<strong>Call</strong>（给定 API 描述直接调用）、<strong>Retrieve+Call</strong>（从 API 池检索并调用）、<strong>Plan+Retrieve+Call</strong>（自主规划多步 API 调用链）",
        "构建首个可执行评测系统：<strong>73 个真实 API</strong>、<strong>314 个对话</strong>、<strong>753 次 API 调用</strong>，覆盖 7 大领域（账户管理、信息查询、健康管理、日程管理、智能家居、金融管理、其他），人工标注成本 $8/对话",
        "提出 <strong>Multi-agent 数据生成框架</strong>：5 个 LLM 智能体（Domain → API → Query → API Call &amp; Response → Quality Check）协作自动生成训练数据，将标注成本降低 <strong>98%</strong>（对比纯人工）",
        "构建最大规模工具增强训练集：<strong>2,138 个 API</strong>、<strong>1,888 个对话</strong>、<strong>4,149 次 API 调用</strong>，横跨 <strong>1,000+ 领域</strong>",
        "训练开源模型 <strong>Lynx</strong>（基于 Alpaca-7B）：Call 准确率提升超 <strong>26 个百分点</strong>，ROUGE-L 提升 <strong>0.41</strong>，接近 GPT-3.5 水平",
        "系统分析三大类模型的错误模式：Alpaca 主错「不调用 API」（36.77%），Lynx 主错「API 幻觉」（61.38%），GPT-4 主错「API 检索失败」（67.86%）",
        "关键发现：<strong>指令微调</strong>是模型具备工具调用能力的必要条件（未经指令微调的 GPT-3 Davinci 几乎为零能力）；GPT-4 在规划推理上显著优于 GPT-3.5（Plan+Retrieve+Call 提升近 50%）"
      ],
      "detail": "<h5>1. 核心示意图</h5>\n<p><img alt=\"API-Bank 三级能力示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2304.08244/assets/x1.png\" />\n<em>图 1：API-Bank 定义的三级工具使用能力——Call（调用）、Retrieve+Call（检索+调用）、Plan+Retrieve+Call（规划+检索+调用）</em></p>\n<p><img alt=\"用户需求四象限\" src=\"https://ar5iv.labs.arxiv.org/html/2304.08244/assets/x2.png\" />\n<em>图 2：基于 500+ 用户访谈提炼的两维度四象限需求模型——API 数量（少 vs 多）× 每轮调用数（单次 vs 多次）</em></p>\n<p><img alt=\"Multi-agent 数据生成框架\" src=\"https://ar5iv.labs.arxiv.org/html/2304.08244/assets/x3.png\" />\n<em>图 3：五个 LLM 智能体协作自动生成训练数据——Domain Agent → API Agent → Query Agent → API Call Agent → Quality Check Agent</em></p>\n<h5>2. 三级能力定义（核心框架）</h5>\n<p>API-Bank 的核心创新在于首次系统定义了工具增强 LLM 的三级递进能力：</p>\n<ul>\n<li>\n<p><strong>Level 1 — Call（调用）</strong>：给定少量 API（2-3 个）的完整描述（名称、参数、返回值），模型需在单轮对话中准确选择并调用正确的 API。这本质上是「槽位填充」任务——理解指令并填入正确的 API 参数。</p>\n</li>\n<li>\n<p><strong>Level 2 — Retrieve+Call（检索+调用）</strong>：API 池扩大至数十到上百个，模型不再能一次性看到所有 API 描述。它必须先通过一个特殊的 <code>API Search</code> 工具，用关键词检索相关 API，再执行调用。这测试模型的「需求到关键词」凝练能力。</p>\n</li>\n<li>\n<p><strong>Level 3 — Plan+Retrieve+Call（规划+检索+调用）</strong>：用户给出一个复杂需求（如「帮我规划一次旅行」），模型需自主将其分解为多步 API 调用链（查天气 → 订酒店 → 订机票 → 设日程提醒），每一步都可能需要先检索再调用。这测试模型的<strong>长程规划与推理能力</strong>。</p>\n</li>\n</ul>\n<div class=\"key-point\">💡 关键：这三个能力是严格递进的。实验表明，GPT-3.5 从 Level 1 到 Level 3 性能下降约 38%，而 GPT-4 仅下降约 21%，揭示了<strong>规划能力</strong>是区分大模型工具使用水平的关键维度。</div>\n<h5>3. Multi-agent 数据生成方法</h5>\n<p>由于人工标注 API 对话成本极高（$8/对话）且难以覆盖上千领域，API-Bank 提出了革命性的 Multi-agent 自动数据生成流水线：</p>\n<p><strong>五个智能体的分工</strong>：\n1. <strong>Domain Agent</strong>：生成多样化领域主题（如心理健康、牙科费用估算、营养规划等），确保领域广度\n2. <strong>API Agent</strong>：在给定领域下，设计真实可用的 API（如 SearchDoctors、GetPrice、RecordMaintenance），确保 API 多样性与真实性\n3. <strong>Query Agent</strong>：生成用户查询，要求覆盖三个能力等级，确保训练数据的能力完整性\n4. <strong>API Call &amp; Response Agent</strong>：生成对应的 API 调用及返回结果，确保对话逻辑一致性\n5. <strong>Quality Check Agent</strong>：对生成数据逐一校验，过滤格式错误、逻辑不一致、API 幻觉等问题，确保数据质量</p>\n<p><strong>核心设计洞见</strong>：直接将所有需求（领域多样 + API 真实 + 三级能力 + 格式规范）一次性输入 ChatGPT 生成，仅 5% 数据可用；升级到 GPT-4 也仅有 25% 可用。将复杂需求<strong>分解为多个简单子任务</strong>交给不同智能体串行执行，是提升数据生成质量的关键。这一洞见本身对后续工作（如 ToolAlpaca、ToolLLM 等）有深远影响。</p>\n<h5>4. 评测系统设计</h5>\n<p>评测系统的核心是「可执行性」——每个 API 都经过实际编码实现，数据库预填充初始值，外部信息查询结果被硬编码以确保可复现。此外：</p>\n<ul>\n<li><strong>特殊 API「API Search」</strong>：当评估 Retrieve+Call 和 Plan+Retrieve+Call 时，模型不能直接看到 API 池中的所有 API，必须通过 API Search 检索。API Search 将用户的查询关键词与所有 API 元信息的句子嵌入做余弦相似度匹配，返回最相关 API。</li>\n<li><strong>评测指标</strong>：API 调用准确性（Accuracy，判断预测与标注是否执行相同的数据库操作并返回相同结果）+ 响应质量（ROUGE-L）。注意这里的 Accuracy 并非简单的文本匹配，而是<strong>执行层面的语义等价判断</strong>。</li>\n</ul>\n<h5>5. 实验结果与错误分析</h5>\n<p><img alt=\"Call 示例\" src=\"https://ar5iv.labs.arxiv.org/html/2304.08244/assets/x6.png\" />\n<em>图 6：Level 1 Call 能力示例——给定天气和翻译 API，直接选择调用</em></p>\n<p><img alt=\"Retrieve+Call 示例\" src=\"https://ar5iv.labs.arxiv.org/html/2304.08244/assets/x7.png\" />\n<em>图 7：Level 2 Retrieve+Call 能力示例——先用 API Search 检索，再调用</em></p>\n<p><img alt=\"Plan+Retrieve+Call 示例\" src=\"https://ar5iv.labs.arxiv.org/html/2304.08244/assets/x8.png\" />\n<em>图 8：Level 3 Plan+Retrieve+Call 能力示例——多步规划，自主分解复杂需求</em></p>\n<p><strong>主要结论</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>模型</th>\n<th>Call 能力</th>\n<th>Retrieve+Call</th>\n<th>Plan+Retrieve+Call</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>GPT-3 Davinci</td>\n<td>几乎为零</td>\n<td>—</td>\n<td>—</td>\n</tr>\n<tr>\n<td>Alpaca-7B / ChatGLM-6B</td>\n<td>~20%</td>\n<td>—</td>\n<td>可忽略</td>\n</tr>\n<tr>\n<td>GPT-3.5</td>\n<td>最优秀</td>\n<td>下降 21%</td>\n<td>再降 17%</td>\n</tr>\n<tr>\n<td>GPT-4</td>\n<td>比 GPT-3.5 +4pt</td>\n<td>与 GPT-3.5 持平</td>\n<td><strong>提升近 50%</strong>（最强规划）</td>\n</tr>\n<tr>\n<td><strong>Lynx（基于 Alpaca）</strong></td>\n<td>+26pt 领先 Alpaca</td>\n<td>—</td>\n<td>接近 GPT-3.5</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>Lynx vs ToolAlpaca 公平对比</strong>：在使用相同基座模型（Alpaca-7B）的前提下，API-Bank 训练的 Lynx 仅用 6,184 个训练样本即超越 ToolAlpaca 的 10,366 样本效果，验证了 Multi-agent 数据生成的高质量。</p>\n<p><strong>错误模式深度分析</strong>：\n- <strong>Alpaca-7B 原始模型</strong>（36.77%「No API Call」）：根本问题是其训练数据（52K instruction data）的模式与 API 调用格式不匹配，模型不理解「API 调用」这一行为范式。\n- <strong>Lynx 模型</strong>（61.38%「API Hallucination」）：训练后虽学会了调用，但产生了严重幻觉——调用训练中见过的但当前不可用的虚假 API。同时 32% 的错误与参数问题相关（传未替换参数、格式错误、缺少参数、语义误解）。\n- <strong>GPT-4 模型</strong>（67.86%「Failed API Retrieval」）：核心瓶颈不是调用本身，而是无法有效使用 API Search 检索到正确的 API。这说明<strong>检索能力独立于生成能力</strong>，是当前最强模型的主要短板。</p>\n<div class=\"warn-box\">⚠️ 核心洞见：工具增强 LLM 的能力瓶颈随模型能力提升而转移——从「会不会调用」（Alpaca）到「调哪个真 API」（Lynx 幻觉）再到「怎么找到该调的 API」（GPT-4 检索），每一阶段对应不同的技术挑战。</div>\n<pre><code class=\"language-python\">tools = retrieve_tools(query)\naction = planner.select(query, tools)\nobs = execute(action)\nreturn synthesize_answer(query, obs)\n</code></pre>",
      "quiz": {
        "q": "API-Bank 测试中，GPT-4 在 Plan+Retrieve+Call 场景下表现显著优于 GPT-3.5，但最主要的错误类型是什么？",
        "options": [
          "API 调用格式错误（False API Call Format）",
          "API 幻觉（API Hallucination），调用不存在的 API",
          "API 检索失败（Failed API Retrieval），无法有效找到正确 API",
          "缺少输入参数（Missing Input Parameters）"
        ],
        "answer": 2,
        "explain": "GPT-4 的错误中 67.86% 属于 API 检索失败，说明即使是最强模型在从大量 API 中准确检索目标工具方面仍存在显著短板，检索能力与生成能力存在独立的能力维度。"
      }
    },
    {
      "id": "gorilla",
      "num": 6,
      "name": "Gorilla",
      "fullName": "海量API连接模型 (Gorilla)",
      "year": "2023.05",
      "org": "UC Berkeley",
      "parent": "toolformer",
      "paperUrl": "https://arxiv.org/abs/2305.15334",
      "projectUrl": "",
      "category": "learning",
      "motivation": "检索文档后稳健生成API参数",
      "summary": "Gorilla 通过在大规模 API 文档和合成指令对上微调 LLaMA，并引入 retriever-aware 训练，让模型能够从自然语言请求中稳定生成正确的 API 调用，在大规模 ML API 调用任务上显著超过同期通用大模型并明显降低工具幻觉。",
      "keyPoints": [
        "构建了 <strong>APIBench</strong>：从 HuggingFace、TorchHub、TensorFlow Hub 收集 <strong>1,645</strong> 个 API 文档，形成系统化的 API 调用数据集。",
        "采用 <strong>self-instruct</strong> 生成训练数据：只用少量人工种子示例，就为每个 API 合成多条自然语言指令与目标调用对。",
        "提出 <strong>retriever-aware fine-tuning</strong>：训练时把检索到的 API 文档拼接到用户请求中，教模型学会“读文档再调用”。",
        "设计 <strong>AST subtree matching</strong> 评测：不再只看字符串是否完全相同，而是检查候选调用是否在语法树层面匹配目标 API。",
        "显式区分 <strong>hallucination</strong> 与 <strong>error</strong>：调用了根本不存在的 API 记为 hallucination；调用了库内 API 但参数或选择错误记为 error。",
        "验证了 <strong>测试时文档变更适应能力</strong>：当 API 名称、registry 或约束发生变化时，retriever-aware Gorilla 比纯零样本模型更稳。"
      ],
      "detail": "<p><img alt=\"Gorilla 框架图\" src=\"https://ar5iv.labs.arxiv.org/html/2305.15334/assets/x1.png\" /></p>\n<p><em>图：Gorilla 总体流程。上半部分是用 API 文档和合成指令构造训练数据，下半部分是推理时的两种模式：零样本直接调用，或先检索文档再调用。</em></p>\n<h5>数据集构建：从 API 文档到指令-调用对</h5>\n<p>Gorilla 的第一步不是改模型结构，而是先把“工具调用”这件事数据化。作者从三个模型中心收集 API 文档：</p>\n<ul>\n<li><strong>HuggingFace</strong>：筛到 925 个高质量模型卡；</li>\n<li><strong>TensorFlow Hub</strong>：保留 626 个模型；</li>\n<li><strong>Torch Hub</strong>：保留 95 个模型。</li>\n</ul>\n<p>合计 <strong>1,645 个 API</strong>。每个 API 文档被整理成统一 JSON 结构，包含：</p>\n<ul>\n<li>domain</li>\n<li>framework</li>\n<li>functionality</li>\n<li>api_name</li>\n<li>api_call</li>\n<li>api_arguments</li>\n<li>environment_requirements</li>\n<li>example_code</li>\n<li>performance</li>\n<li>description</li>\n</ul>\n<p>接着作者借助 GPT-4 按 self-instruct 范式，把 API 文档转成自然语言指令。关键点在于：<strong>用户指令里不能直接泄露 API 名称</strong>，必须像真实用户一样只描述任务目标。</p>\n<pre><code class=\"language-python\">def build_training_pair(api_doc):\n    instruction = gpt4_self_instruct(api_doc, few_shot_examples=3)\n    target_call = api_doc[&quot;api_call&quot;]\n    return {&quot;user&quot;: instruction, &quot;assistant&quot;: target_call}\n</code></pre>\n<p>每个 API 最终生成 10 条左右指令-调用对，训练时再转成一轮 user-agent 对话格式，对 LLaMA-7B 做标准 instruction tuning。</p>\n<h5>核心机制：retriever-aware training</h5>\n<p>Gorilla 的真正技术点不只是“微调一个会调 API 的模型”，而是让模型学会在推理时<strong>依赖外部文档而不是死记参数</strong>。训练时，用户输入会被扩成：</p>\n<p><code>&lt;user_prompt&gt; + \"Use this API documentation for reference:\" + &lt;retrieved_API_doc_JSON&gt;</code></p>\n<p>这样模型被教会两件事：</p>\n<ul>\n<li>前半段是用户意图；</li>\n<li>后半段是 API 文档证据，模型需要“看文档回答问题”。</li>\n</ul>\n<p>推理时有两种模式：</p>\n<ul>\n<li><strong>zero-shot</strong>：不给检索文档，直接根据模型记忆生成调用；</li>\n<li><strong>with retrieval</strong>：先用 BM25、GPT-Index 或 oracle retriever 找到相关文档，再拼接进 prompt。</li>\n</ul>\n<p>这让 Gorilla 能在 API 文档变动时保持适应性。论文专门验证了两类变化：</p>\n<ul>\n<li>模型规格升级，如 backbone 从 ResNet-50 换到 ResNet-101；</li>\n<li>registry 变化，如 API 来源从 <code>pytorch/vision</code> 换到新的 registry。</li>\n</ul>\n<div class=\"key-point\">💡 关键：Gorilla 不是把“所有 API 参数背下来”，而是把“根据外部文档拼出正确调用”训练成一种可迁移能力。</div>\n<h5>评测创新：AST subtree matching</h5>\n<p>API 调用评测的难点是：同一任务可能有多个合法答案，简单字符串精确匹配不够合理。Gorilla 采用 <strong>AST subtree matching</strong>：</p>\n<ol>\n<li>把模型输出的 Python API 调用解析成抽象语法树；</li>\n<li>与数据集中的参考 API 树比对；</li>\n<li>如果调用主干和关键参数能匹配到某个参考子树，就判为命中了正确 API。</li>\n</ol>\n<p>这样做有两个好处：</p>\n<ul>\n<li><strong>允许可选参数差异</strong>，不因无关字段误伤；</li>\n<li>能直接识别 <strong>hallucination</strong>：如果输出根本不属于库中任何 API，就说明模型凭空捏造了工具。</li>\n</ul>\n<h5>关键实验发现</h5>\n<p>论文最有代表性的结果有三点：</p>\n<ul>\n<li><strong>零样本 API 调用能力</strong>：Gorilla 在 Torch Hub、HuggingFace、TensorFlow Hub 三个集合上都显著优于 GPT-4、GPT-3.5、Claude 和原始 LLaMA。</li>\n<li><strong>检索不是越多越好</strong>：如果 retriever 不准，拼进去的文档反而会误导模型；这说明“有 retrieval”不等于“会用 retrieval”。</li>\n<li><strong>带检索训练优于纯拼接检索</strong>：只有在训练阶段就把 retrieval 纳入输入格式，模型才能真正学会利用文档，并在测试时应对 API 变化。</li>\n</ul>\n<p>论文还单独考察了 <strong>带约束的 API 调用</strong>，例如要求模型在多个图像分类模型中，选出参数量低于某阈值、但精度高于某阈值的那个。这要求模型不仅理解功能，还要理解约束字段。</p>\n<h5>Gorilla 的定位</h5>\n<p>如果说 Toolformer 证明了“模型可以学会何时调用工具”，那 Gorilla 更进一步证明了：</p>\n<ul>\n<li><strong>开放 API 文档可以成为训练信号</strong>；</li>\n<li><strong>工具调用的关键不是函数名，而是文档理解 + 参数生成</strong>；</li>\n<li><strong>外部检索文档应被纳入训练分布，而不是只在推理时临时拼接</strong>。</li>\n</ul>\n<p>后面的 BFCL、ToolLLM、OpenFunctions，本质上都延续了 Gorilla 把 API 调用做成独立能力赛道的思路。</p>\n<div class=\"warn-box\">⚠️ 注意：Gorilla 论文主要研究的是“单次 API 调用正确性”，多步工具链、长程状态管理和复杂 agent 规划，并不是这篇工作的重点。</div>",
      "quiz": {
        "q": "Gorilla 采用 AST subtree matching 评测 API 调用，主要是为了解决什么问题？",
        "options": [
          "让训练速度更快",
          "避免把语义等价但字符串不完全相同的调用误判为错误",
          "把所有 API 自动翻译成 SQL",
          "让模型在推理时不再需要文档检索"
        ],
        "answer": 1,
        "explain": "同一任务可能有多个合法调用写法，AST subtree matching 能容忍可选参数差异，并识别真正的 API 命中与 hallucination。"
      }
    },
    {
      "id": "toolllm",
      "num": 7,
      "name": "ToolLLM",
      "fullName": "万级API工具学习框架 (ToolLLM)",
      "year": "2023.07",
      "org": "Tsinghua University",
      "parent": "gorilla",
      "paperUrl": "https://arxiv.org/abs/2307.16789",
      "projectUrl": "",
      "category": "learning",
      "motivation": "把万级真实API纳入训练与搜索",
      "summary": "ToolLLM 首次将 16,464 个真实 REST API 纳入 LLM 的工具学习闭环，通过 **DFSDT（深度优先搜索决策树）** 规划策略和 **ToolBench** 数据集，使开源模型在工具使用评测 **ToolEval** 上达到甚至超越闭源 GPT-4 的水平。",
      "keyPoints": [
        "<strong>动机</strong>：现有工具增强 LLM 研究仅使用少量（通常 &lt; 10 个）手工挑选或合成的 API，远远无法复现真实世界中 ChatGPT Plugins 等系统需要从数万级 API 中精确选用的复杂度。",
        "<strong>ToolBench 数据集</strong>：从 RapidAPI 爬取了 16,464 个真实 REST API（49 个粗粒度类别，如 Weather、Finance、Crypto），并自动生成指令-解决方案对。每条指令对应一个多步骤 API 调用链（单步到最多 8 步），共覆盖单工具和多工具组合场景。",
        "<strong>DFSDT 决策策略</strong>：针对多步 API 链中每一步可能有多候选工具的情况，提出深度优先搜索决策树——LLM 在每个步骤生成多个候选 API 调用，若某分支执行失败则回溯尝试下一条，显著提升规划成功率。",
        "<strong>ToolLLaMA 模型</strong>：基于 LLaMA 对 ToolBench 数据进行监督微调（SFT），获得与 GPT-4 可比的工具使用能力。",
        "<strong>ToolEval 评测基准</strong>：引入基于 LLM 的自动化评估器，从「是否选择了正确的 API」「参数是否正确填充」「最终答案是否正确」等多个维度自动评判工具使用质量，与人工评估高度一致（Pearson 相关系数 &gt; 0.8）。"
      ],
      "detail": "<h5>(a) 系统架构与工作流</h5>\n<p>ToolLLM 的工作流分为四个阶段：</p>\n<ol>\n<li><strong>API 收集与筛选</strong>：从 RapidAPI Hub 收集 16,464 个 REST API，涵盖 Sports、Finance、Weather、Translation 等 49 个类别，清洗后保留可调用的 API，提取其 OpenAPI/Swagger 文档。</li>\n<li><strong>指令生成</strong>：基于 API 文档，利用 ChatGPT 自动生成多样化用户指令及对应的多步 API 调用链。指令生成策略包括：单工具单步、单工具多步、多工具组合、带条件分支的调用。</li>\n<li><strong>解决方案搜索</strong>：在训练阶段使用 DFSDT 搜索正确的 API 调用序列；每一步评估多个候选，失败则回溯，最终得到可执行的 ground-truth 轨迹。</li>\n<li><strong>模型训练与评估</strong>：用搜得的轨迹对 LLaMA 进行 SFT，得到 ToolLLaMA；在 ToolEval 上与 ChatGPT、GPT-4 等对比。</li>\n</ol>\n<p><img alt=\"ToolLLM 系统架构\" src=\"https://ar5iv.labs.arxiv.org/html/2307.16789/assets/figures/overview.png\" /></p>\n<p><em>图：ToolLLM 整体框架，包括 API收集、指令生成、DFSDT 求解搜索、ToolLLaMA 训练评估四阶段。</em></p>\n<pre><code>┌─────────────────┐     ┌──────────────────────┐     ┌──────────────────┐\n│  RapidAPI Hub    │────▶│  16,464 REST APIs    │────▶│  Instruction     │\n│  (49 categories) │     │  + OpenAPI Docs      │     │  Generation      │\n└─────────────────┘     └──────────────────────┘     └────────┬─────────┘\n                                                              │\n                    ┌──────────────────────┐                  │\n                    │  ToolEval (Auto Eval) │◀─────────────────┤\n                    │  - API Selection      │                  │\n                    │  - Param Correctness  │     ┌────────────▼──────────┐\n                    │  - Answer Quality     │     │  DFSDT Solution       │\n                    └──────────────────────┘     │  Search (train)       │\n                                                  │  - Candidate gen      │\n                                                  │  - Backtrack on fail  │\n                                                  └───────────┬───────────┘\n                                                              │\n                                                  ┌───────────▼───────────┐\n                                                  │  ToolLLaMA (SFT)      │\n                                                  │  ← LLaMA + ToolBench  │\n                                                  └───────────────────────┘\n</code></pre>\n<div class=\"key-point\">💡 关键：DFSDT 是连接指令和可执行轨迹的核心桥梁，它将 LLM 生成的多候选调用的「试错」过程变成系统化的搜索问题。</div>\n<h5>(b) DFSDT（深度优先搜索决策树）核心机制</h5>\n<p>DFSDT 是 ToolLLM 的核心规划算法。给定用户指令和 API 候选池，LLM 在每一步生成 <span class=\"kb-math kb-math-inline\">B</span> 个候选 API 调用，然后将成功执行的调用结果追加到上下文栈中，若某分支失败则自动回溯。</p>\n<p><img alt=\"DFSDT 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2307.16789/assets/figures/dfsdt.png\" /></p>\n<p><em>图：DFSDT 搜索树示意——每个节点为一次 API 调用决策，红色叉标明执行失败后回溯到父节点尝试下一个候选项。</em></p>\n<p><strong>伪代码</strong>：</p>\n<pre><code class=\"language-python\">def dfsdt(instruction, api_pool, max_depth=H, beam_size=B):\n    stack = [(instruction, [])]  # (current_context, history)\n\n    while stack:\n        context, history = stack.pop()\n        if len(history) &gt;= max_depth:\n            if answer_reached(context):\n                return history  # 成功路径\n\n        # 1. LLM 为当前步骤生成 B 个候选 API 调用\n        candidates = llm_propose(context, api_pool, beam_size=B)\n\n        # 2. 按置信度排序，逆序入栈以保持优先序\n        for api_call in reversed(candidates):\n            try:\n                result = execute_api(api_call)\n                new_context = context + f&quot;\\nAPI Result: {result}&quot;\n                stack.append((new_context, history + [api_call]))\n            except APIError:\n                continue  # 该分支失败，自动回溯\n\n    return None  # 搜索失败\n</code></pre>\n<p><strong>要点解释</strong>：</p>\n<ul>\n<li><strong>Beam候选生成</strong>：每步 LLM 不单选 1 个 API，而是生成 <span class=\"kb-math kb-math-inline\">B</span> 个候选（beam），极大降低单步失败率。论文中 <span class=\"kb-math kb-math-inline\">B</span> 一般设为 3~5。</li>\n<li><strong>自动回溯</strong>：当某个 API 调用返回错误（404、参数错误等），DFSDT 自动丢弃该分支并尝试栈中下一个候选，无需人工干预。这使得模型可以在数万级 API 的真实「噪音」环境中鲁棒执行。</li>\n<li><strong>终止条件</strong>：达到最大深度 <span class=\"kb-math kb-math-inline\">H</span> 或 LLM 判断已给出完整答案时终止搜索返回路径。</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：DFSDT 仅在 <strong>训练阶段</strong> 用作 ground-truth 求解器；<strong>推理阶段</strong> ToolLLaMA 直接自回归生成 API 调用，不执行回溯，以保证实时性。</div>\n<h5>(c) 实验结果要点</h5>\n<ul>\n<li><strong>ToolLLaMA-7B</strong> 在 ToolEval 上综合得分达到 GPT-3.5-turbo 的约 95%，部分场景超越 GPT-4。</li>\n<li><strong>DFSDT vs 贪婪搜索</strong>：在需要多步组合的复杂指令上，DFSDT 的通过率比贪婪解码高 18% 以上。</li>\n<li><strong>API 规模影响</strong>：随着候选 API 池从 100 扩大到 10000，闭源模型（GPT-4）性能下降约 30%，而 ToolLLaMA 仅下降约 12%，表明其在大规模工具检索场景下的鲁棒性。</li>\n<li><strong>ToolEval 与人工评估一致性</strong>：自动评估与人工评分的 Pearson 相关系数达到 0.85，验证了 ToolEval 作为自动化评测基准的可靠性。</li>\n</ul>\n<h5>(d) API Retriever 模块</h5>\n<p>面对 16,464 个 API，不可能全部塞入 prompt。ToolLLM 引入了一个轻量级 <strong>API Retriever</strong>：\n- 基于 Sentence-BERT 将所有 API 文档描述编码为稠密向量，存入 FAISS 索引。\n- 给定用户指令，检索 top-<span class=\"kb-math kb-math-inline\">k</span>（通常 <span class=\"kb-math kb-math-inline\">k=100 \\sim 200</span>）最相关的候选 API，大幅缩减搜索空间。\n- 该检索器与 LLM 解耦，可独立升级或替换为更强大的检索模型。</p>\n<h5>(e) 关键发现与洞察</h5>\n<ol>\n<li><strong>真实 API 的「噪音」反而提升泛化</strong>：RapidAPI 文档天然包含不完整描述、过时接口、非结构化返回体，模型在训练中学会应对这些不确定性，测试时泛化优于全合成 API 训练。</li>\n<li><strong>多步骤链中的错误传播是瓶颈</strong>：即使单独 API 调用正确率很高，3 步以上的链中错误累积导致最终成功率大幅下降。DFSDT 通过回溯机制在此类场景收益最大。</li>\n<li><strong>指令多样性至关重要</strong>：ToolBench 包含 13 类指令（如 Explain、Create、Update、Compare 等），消融实验表明移除任何一类指令都会导致对应场景的性能断崖式下降。</li>\n</ol>\n<div class=\"key-point\">💡 关键启发：将真实世界的不完备性（过期文档、返回异常）视为一种噪声正则化，是 ToolLLM 泛化性的重要保证。</div>",
      "quiz": {
        "q": "DFSDT 在 ToolLLM 中的主要设计目的是什么？",
        "options": [
          "提升 API 调用时的网络传输速率",
          "在多步 API 链中通过候选生成与失败回溯，提高规划成功率",
          "压缩 API 文档长度，减少 prompt token 消耗",
          "将 REST API 自动转换为 GraphQL 接口"
        ],
        "answer": 1,
        "explain": "DFSDT 在每一步生成多个候选 API，执行失败后自动回溯尝试下一个，从而在真实的不可靠 API 环境中实现高成功率的规划。"
      }
    },
    {
      "id": "llm_compiler",
      "num": 8,
      "name": "LLMCompiler",
      "fullName": "并行函数调用编译器 (LLMCompiler)",
      "year": "2023.12",
      "org": "UC Berkeley",
      "parent": "react",
      "paperUrl": "https://arxiv.org/abs/2312.04511",
      "projectUrl": "",
      "category": "orchestration",
      "motivation": "把串行工具链编译成并行执行图",
      "summary": "LLMCompiler 借鉴经典编译器的指令并行优化思想，将 ReAct 式的\"推理-行动-观察\"串行循环重构为 Planner→Task Fetching Unit→Executor 的三阶段并行流水线，在多任务/多工具场景下实现最高 3.7× 延迟降低与 6.7× 成本节约。",
      "keyPoints": [
        "提出 Function Calling Planner (FCP)：通过单次 LLM 推理将用户任务分解为带依赖关系的子任务 DAG，以 <code>$N</code> 引用标记标记对前置任务输出的依赖",
        "设计 Task Fetching Unit (TFU)：类比 CPU 指令取指单元，贪婪地将所有依赖已满足的任务分发给 Executor，并完成引用标记→实际输出的替换",
        "构建并行 Executor：异步并发执行无依赖的子任务，支持搜索引擎、计算器、API、子 LLM Agent 等多种工具类型",
        "支持流式规划 (Streaming Planner)：任务一经生成立即流出，不等完整 DAG 完成，进一步降低首 token 延迟",
        "引入动态重规划 (Dynamic Replanning)：当执行结果与预期不符时，FCP 可基于中间结果重新生成计划，适配 Game of 24 等需迭代推理的场景",
        "在 HotpotQA、Movie Recommendation、ParallelQA、Game of 24、WebShop 五大基准上验证，覆盖易并行、复杂依赖、动态重规划、交互式决策四种模式",
        "在 LLaMA-2、GPT-3.5、GPT-4 等模型上均表现优异，且在某些场景超越 OpenAI 原生并行函数调用"
      ],
      "detail": "<h5>核心架构图</h5>\n<p><img alt=\"LLMCompiler 架构总览\" src=\"https://raw.githubusercontent.com/SqueezeAILab/LLMCompiler/main/figs/thumbnail.png\" />\n<em>图：LLMCompiler 的三组件流水线架构——Planner 生成 DAG，Task Fetching Unit 调度就绪任务，Executor 并行执行</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># LLMCompiler 核心执行流程\ndef llm_compiler(user_input, tools):\n    # 阶段1: 规划 (一次LLM推理)\n    dag = FunctionCallingPlanner(user_input, tools)\n    # dag = [\n    #   {&quot;id&quot;: 1, &quot;tool&quot;: &quot;search&quot;, &quot;args&quot;: &quot;微软市值&quot;, &quot;deps&quot;: []},\n    #   {&quot;id&quot;: 2, &quot;tool&quot;: &quot;search&quot;, &quot;args&quot;: &quot;苹果市值&quot;, &quot;deps&quot;: []},\n    #   {&quot;id&quot;: 3, &quot;tool&quot;: &quot;math&quot;,  &quot;args&quot;: &quot;$1 / $2&quot;,   &quot;deps&quot;: [1,2]},\n    #   {&quot;id&quot;: 4, &quot;tool&quot;: &quot;llm&quot;,   &quot;args&quot;: &quot;$3&quot;,         &quot;deps&quot;: [3]}\n    # ]\n\n    results = {}\n    running = []\n    idx = 0\n\n    while idx &lt; len(dag) or running:\n        # 阶段2: TFU — 收集依赖已就绪的任务\n        ready = []\n        while idx &lt; len(dag):\n            task = dag[idx]\n            if all(dep in results for dep in task[&quot;deps&quot;]):\n                # 引用标记替换: $1 → 前驱任务实际输出\n                resolved_args = task[&quot;args&quot;]\n                for dep_id in task[&quot;deps&quot;]:\n                    resolved_args = resolved_args.replace(\n                        f&quot;${dep_id}&quot;, str(results[dep_id])\n                    )\n                ready.append((task[&quot;id&quot;], task[&quot;tool&quot;], resolved_args))\n                idx += 1\n            elif not task[&quot;deps&quot;]:\n                ready.append((task[&quot;id&quot;], task[&quot;tool&quot;], task[&quot;args&quot;]))\n                idx += 1\n            else:\n                break  # 后续任务依赖未就绪，阻塞等待\n\n        # 阶段3: Executor — 并行执行所有就绪任务\n        if ready:\n            outputs = parallel_execute(ready, executor_pool)\n            for tid, output in outputs.items():\n                results[tid] = output\n        else:\n            # 动态重规划: 无任务就绪且未完成时触发\n            if idx &lt; len(dag):\n                dag = replan(dag, results)\n\n    # 最终合并: 一次LLM调用生成面向用户的答案\n    return final_merge(results)\n</code></pre>\n<h5>1. 动机与背景：ReAct 的串行瓶颈</h5>\n<p>传统 LLM Agent 框架（如 ReAct）遵循\"推理→行动→观察→推理→...\"的固定循环。每一轮工具调用都需要一次完整的 LLM 前向推理，且必须等待工具返回结果后才能进入下一轮思考。当用户查询包含多个<strong>相互独立</strong>的子任务时——例如\"对比微软和苹果的市值\"——串行执行搜索引擎两次查询、一次数学计算、一次结果总结，共需 4 轮 LLM 推理，但其中前两次搜索完全可以并行。</p>\n<p>LLMCompiler 的核心洞察是：<strong>LLM 的函数调用图本质上是一个指令依赖图（Instruction Dependency Graph）</strong>，与经典编译器中待优化的程序指令图完全同构。编译器通过数据流分析识别可并行基本块，LLMCompiler 则将这一范式迁移到工具调用领域。</p>\n<h5>2. 三组件流水线详解</h5>\n<p><strong>Function Calling Planner (FCP)</strong>\nPlanner 接收用户自然语言输入和工具定义列表，通过一次 LLM 推理输出结构化的任务 DAG。每个任务包含：\n- <code>id</code>：唯一标识符\n- <code>tool</code>：调用的工具名称\n- <code>args</code>：工具参数，其中 <code>$N</code> 表示对第 N 个任务输出的依赖\n- <code>deps</code>：显式的依赖列表（冗余但增强了可靠性）</p>\n<p>Planner 的 prompt 工程是该方法的关键：它要求 LLM 输出严格的 JSON 格式，并通过 in-context examples 引导 LLM 正确识别并行机会。例如，当用户问\"查找 A 和 B 的信息并比较\"时，Planner 应识别出 A 和 B 的检索无数据依赖，将其标记为可并行任务。</p>\n<p><strong>Task Fetching Unit (TFU)</strong>\nTFU 是一个轻量级调度器，不涉及任何 LLM 调用。其工作流程为：\n1. 维护一个就绪队列，扫描 DAG 中所有依赖已满足的任务\n2. 执行<strong>引用标记替换</strong>（placeholder substitution）：将 <code>$N</code> 替换为前驱任务的实际字符串输出\n3. 以贪婪策略将所有就绪任务派发给 Executor\n4. 若无就绪任务且 DAG 未完成，触发动态重规划信号</p>\n<p>引用标记替换机制是 LLMCompiler 区别于 OpenAI 原生并行调用的关键。OpenAI 允许同时触发多个函数，但<strong>不管理函数间的数据依赖</strong>——开发者必须手动将前驱输出填入后继输入。LLMCompiler 的 <code>$N</code> 引用标记自动完成这一过程。</p>\n<p><strong>Executor</strong>\nExecutor 是一个异步并发执行引擎。每个任务配有独立内存空间存储中间结果。支持的工具类型包括：\n- 搜索引擎（如 Google Search API）\n- 计算器（math tool）\n- 子 LLM Agent（递归调用 LLM 完成子任务）\n- 通用 API 调用</p>\n<p>所有任务完成后，最终结果通过一次 LLM 调用全量合并，生成面向用户的自然语言回答。</p>\n<h5>3. 动态重规划：当 DAG 不够时</h5>\n<p>某些任务（如 Game of 24：用 4 个数字通过四则运算得到 24）无法预先规划完整 DAG——每一步的最佳操作取决于上一步的中间结果。LLMCompiler 引入<strong>闭环重规划</strong>机制：</p>\n<ol>\n<li>Planner 初始生成探索计划（<code>thought_proposer</code> 提议候选操作）</li>\n<li>Executor 并行执行 <code>state_evaluator</code> 评估所有候选，<code>top_k_select</code> 筛选</li>\n<li>若无候选达到目标状态（24），Executor 向 Planner 发送 <code>replan</code> 信号</li>\n<li>Planner 基于上轮筛选后的中间状态重新生成计划</li>\n</ol>\n<p>这使得 LLMCompiler 在需要深度搜索的任务中仍能保持并行优势——每轮评估多个候选而非逐一尝试。对比 Tree-of-Thoughts（纯串行树搜索），LLMCompiler 在 Game of 24 上实现 2× 加速。</p>\n<h5>4. 与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特性</th>\n<th>ReAct</th>\n<th>OpenAI Parallel FC</th>\n<th>LLMCompiler</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>任务分解</td>\n<td>每步推理一次</td>\n<td>无显式分解</td>\n<td>单次 DAG 生成</td>\n</tr>\n<tr>\n<td>并行执行</td>\n<td>不支持</td>\n<td>支持（无依赖管理）</td>\n<td>支持（依赖感知）</td>\n</tr>\n<tr>\n<td>依赖管理</td>\n<td>手动编排</td>\n<td>无</td>\n<td>引用标记自动替换</td>\n</tr>\n<tr>\n<td>动态重规划</td>\n<td>天然支持（逐轮调整）</td>\n<td>不支持</td>\n<td>支持（反馈回路）</td>\n</tr>\n<tr>\n<td>LLM 调用次数</td>\n<td>O(N)</td>\n<td>O(1)（但需手动拼接）</td>\n<td>O(1) + 最终合并</td>\n</tr>\n</tbody>\n</table></div>\n<div class=\"key-point\">💡 关键：LLMCompiler 的核心优势在于<strong>通过一次 LLM 推理完成全量规划，利用 DAG 依赖分析最大化并行度</strong>。它不是替代 ReAct，而是在\"规划阶段\"就完成依赖分析，将\"思考\"和\"行动\"分离到不同组件。</div>\n<h5>5. 实验关键结果</h5>\n<p>LLMCompiler 在五大基准上全面超越 ReAct 基线（使用 GPT-3.5-Turbo）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>基准</th>\n<th>模式</th>\n<th>加速比 (vs ReAct)</th>\n<th>成本节省</th>\n<th>准确率</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>HotpotQA</td>\n<td>易并行</td>\n<td>1.80×</td>\n<td>3.37×</td>\n<td>持平</td>\n</tr>\n<tr>\n<td>Movie Recommendation</td>\n<td>易并行</td>\n<td>3.74×</td>\n<td>6.73×</td>\n<td>持平</td>\n</tr>\n<tr>\n<td>ParallelQA</td>\n<td>复杂依赖</td>\n<td>2.27×</td>\n<td>4.65×</td>\n<td>+9%</td>\n</tr>\n<tr>\n<td>Game of 24</td>\n<td>动态重规划</td>\n<td>2.0× (vs ToT)</td>\n<td>—</td>\n<td>—</td>\n</tr>\n<tr>\n<td>WebShop</td>\n<td>交互决策</td>\n<td>101.7× (vs LATS)</td>\n<td>—</td>\n<td>+28.4% 成功率</td>\n</tr>\n</tbody>\n</table></div>\n<p>在 WebShop 上的巨大加速（101.7× vs LATS）尤具说服力：LLMCompiler 将搜索、点击等多步骤并行化，而 LATS 需要逐步骤串行树搜索。在 ParallelQA（新提出的复杂依赖基准）上，LLMCompiler 不仅更快，准确率还提升了 9%——作者认为这是因为并行规划减少了长链推理中的错误累积。</p>\n<h5>6. 局限性</h5>\n<ul>\n<li><strong>强依赖任务退化为 ReAct</strong>：当任务链几乎无法并行化时，LLMCompiler 与 ReAct 无差异</li>\n<li><strong>规划质量依赖底层 LLM</strong>：小模型可能输出错误依赖标注，导致 Executor 死锁</li>\n<li><strong>工具调用可靠性</strong>：并行执行大量工具时的错误处理与重试机制尚需完善</li>\n<li><strong>动态重规划开销</strong>：闭环场景下额外的 replan 调用可能抵消部分并行增益</li>\n</ul>",
      "quiz": {
        "q": "LLMCompiler 中 Task Fetching Unit (TFU) 的核心功能是什么？",
        "options": [
          "执行 LLM 推理生成子任务 DAG",
          "扫描依赖已满足的任务并完成引用标记替换后派发给 Executor",
          "并行调用外部工具并返回结果",
          "对已完成的任务结果进行最终合并生成用户回答"
        ],
        "answer": 1,
        "explain": "TFU 是轻量级调度器，不涉及 LLM 调用。它贪婪地将所有依赖已就绪的任务（完成 $N→实际输出的引用标记替换后）派发给 Executor。Planner 负责生成 DAG，Executor 负责执行，最终合并由单独的 LLM 调用完成。"
      }
    },
    {
      "id": "tau_bench",
      "num": 9,
      "name": "τ-Bench",
      "fullName": "工具-代理-用户交互基准 (τ-Bench)",
      "year": "2024.06",
      "org": "Princeton University",
      "parent": "api_bank",
      "paperUrl": "https://arxiv.org/abs/2406.12045",
      "projectUrl": "",
      "category": "evaluation",
      "motivation": "引入用户交互与领域规则约束",
      "summary": "τ-Bench 提出了首个系统性地将**用户交互**与**领域规则约束**纳入 LLM Agent 评估的基准，通过在模拟数据库环境中引入 LLM 驱动的用户模拟器，揭示现有 Agent 在复杂多轮交互场景下执行成功率大幅下降的关键瓶颈。",
      "keyPoints": [
        "提出 τ-Bench：首个以用户交互为核心的 LLM Agent 评估基准，覆盖零售和航空两个领域",
        "包含 200+ 个手工设计的对话任务，每个任务附带领域数据库和约束规则",
        "引入基于 LLM 的<strong>用户模拟器</strong>，可根据任务目标动态生成用户响应，替代传统静态测试集",
        "每个任务包含可自动验证的数据库状态检查和交互轨迹评估",
        "定义 Agent 需遵循的领域规则（如退换货政策、预订约束），违反规则视为失败",
        "评估框架分离：独立评估工具调用正确性、规则遵循和用户目标达成",
        "实验表明：最佳 Agent（GPT-4o + function calling）在零售领域仅达 45.8%，航空领域 27.1%",
        "开源可扩展框架：支持自定义领域、工具和用户模拟器"
      ],
      "detail": "<p><img alt=\"τ-Bench 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2406.12045/assets/x1.png\" />\n<em>图：τ-Bench 的核心框架或评测示意。</em></p>\n<h5>核心框架图</h5>\n<p>τ-Bench 的评估架构由三个核心组件构成：<strong>LLM Agent</strong>、<strong>用户模拟器</strong>和<strong>环境（数据库+工具+规则）</strong>。Agent 通过工具调用操作数据库，用户模拟器根据任务目标生成动态响应并注入领域约束检查。</p>\n<pre><code>┌─────────────┐    对话交互    ┌─────────────┐\n│  LLM Agent  │ ←──────────→ │  用户模拟器   │\n│ (被评估对象) │               │ (LLM-driven) │\n└──────┬──────┘               └──────────────┘\n       │ 工具调用\n       ▼\n┌─────────────────────────────┐\n│         环境                 │\n│  ┌─────────┐ ┌───────────┐  │\n│  │ 数据库   │ │ 领域规则   │  │\n│  │ (SQLite)│ │ (Policy)  │  │\n│  └─────────┘ └───────────┘  │\n│  ┌───────────────────────┐  │\n│  │ API工具 (Toolkits)    │  │\n│  └───────────────────────┘  │\n└─────────────────────────────┘\n</code></pre>\n<p><em>图：τ-Bench 评估框架的三方交互架构</em></p>\n<h5>任务设计与评估流程</h5>\n<p>τ-Bench 的核心创新在于使用 LLM 驱动的<strong>用户模拟器</strong>替代传统静态测试数据。每个任务被定义为一个 &lt;用户目标，初始数据库状态，领域规则&gt; 三元组：</p>\n<ol>\n<li><strong>模拟用户初始化</strong>：LLM 读取任务描述（如\"我想退掉上周买的鞋子，但我没有收据\"），在对话中扮演用户角色</li>\n<li><strong>Agent 交互</strong>：Agent 调用工具（查询订单、检查库存、处理退款等）与用户协作完成任务</li>\n<li><strong>自动评估</strong>：</li>\n</ol>\n<pre><code class=\"language-python\"># 评估伪代码：τ-Bench 的任务成功判定\ndef evaluate(agent_trajectory, db_initial, db_final, rules):\n    # 1. 数据库状态检查\n    db_correct = check_db_constraints(db_final, db_initial)\n\n    # 2. 规则遵循检查\n    rules_followed = all(\n        rule.verify(agent_trajectory) \n        for rule in rules\n    )\n\n    # 3. 用户目标达成\n    user_goal_achieved = verify_user_goal(\n        db_final, user_goal\n    )\n\n    # 成功仅当三个条件全部满足\n    return db_correct and rules_followed and user_goal_achieved\n</code></pre>\n<h5>两阶段用户模拟机制</h5>\n<p>τ-Bench 的用户模拟器采用<strong>两阶段设计</strong>以增强生成质量：</p>\n<ul>\n<li>\n<p><strong>阶段一：信念状态跟踪</strong>。用户模拟器维护一个内部信念状态（belief state），实时记录已知信息、待确认的事实和用户偏好。对话每轮后更新信念状态值。</p>\n</li>\n<li>\n<p><strong>阶段二：基于信念的响应生成</strong>。在每个对话轮次，用户模拟器根据当前信念状态生成自然语言响应。关键约束条件：</p>\n</li>\n<li>用户只能提供\"记忆中\"的信息（防止信息泄露）</li>\n<li>必须遵守领域规则定义的约束</li>\n<li>响应应自然、类人（包含犹豫、反问、模糊表述等）</li>\n</ul>\n<h5>领域示例</h5>\n<div class=\"key-point\">💡 <strong>τ-Bench 零售领域任务示例：</strong></p>\n<p><strong>任务</strong>：\"你（用户）在 3 天前买了一件 M 码蓝色 T 恤，现在想换成 L 码。但你有以下约束：商品已拆标签但未洗涤，你住在加州。\"</p>\n<p><strong>Agent 需执行</strong>：查询订单 → 验证退换货政策 → 检查 L 码库存 → 处理换货并更新数据库 → 告知用户新预计送达日期。</p>\n<p><strong>规则约束</strong>：未洗涤的拆标商品可换但不可退；加州消费税需在换货差额中重新计算；换货运费政策取决于用户是否为会员。</div>\n<h5>与传统基准的关键区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统基准 (API-Bank, ToolBench)</th>\n<th>τ-Bench</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>用户输入</td>\n<td>静态文本</td>\n<td>LLM 动态模拟</td>\n</tr>\n<tr>\n<td>评估维度</td>\n<td>工具调用准确性</td>\n<td>+规则遵循 + 用户目标达成</td>\n</tr>\n<tr>\n<td>领域知识</td>\n<td>无需</td>\n<td>需理解业务规则</td>\n</tr>\n<tr>\n<td>失败模式</td>\n<td>函数签名错误</td>\n<td>规则违反、不确定性处理</td>\n</tr>\n<tr>\n<td>真实度</td>\n<td>低（固定轨迹）</td>\n<td>高（开放对话）</td>\n</tr>\n</tbody>\n</table></div>\n<h5>关键发现</h5>\n<p>实验揭示了当前 LLM Agent 在用户交互场景下的三大核心挑战：</p>\n<ol>\n<li>\n<p><strong>规则理解与遵循差距显著</strong>：即使最强大的模型（GPT-4o）也在 30%+ 的任务中违反至少一条领域规则，主要表现为忽略退换货政策的边界条件。</p>\n</li>\n<li>\n<p><strong>不确定性处理困难</strong>：当用户提供模糊信息时（如\"大概上周买的\"），Agent 往往要么过于武断地假设，要么过度询问导致对话冗长。</p>\n</li>\n<li>\n<p><strong>长对话轨迹退化</strong>：随对话轮次增加（&gt;15 轮），Agent 的工具调用准确率和信息保持能力显著下降，出现\"遗忘\"用户早期需求的现象。</p>\n</li>\n</ol>",
      "quiz": {
        "q": "τ-Bench 相对于传统 LLM Agent 评估基准（如 ToolBench）的核心创新在于什么？",
        "options": [
          "使用更大的测试数据集",
          "引入 LLM 驱动的用户模拟器和领域规则遵循评估",
          "使用更复杂的工具 API",
          "增加更多领域的任务"
        ],
        "answer": 1,
        "explain": "τ-Bench 的核心创新是用 LLM 动态模拟用户交互，并在评估中显式加入规则遵循检查，而非仅评估工具调用正确性，这使评估更接近真实部署场景。"
      }
    },
    {
      "id": "toolsandbox",
      "num": 10,
      "name": "ToolSandbox",
      "fullName": "有状态工具沙箱评测 (ToolSandbox)",
      "year": "2024.08",
      "org": "Apple",
      "parent": "api_bank",
      "paperUrl": "https://arxiv.org/abs/2408.04682",
      "projectUrl": "",
      "category": "evaluation",
      "motivation": "评测多轮有状态工具执行能力",
      "summary": "> ToolSandbox 提出了首个**有状态（Stateful）、对话式（Conversational）、交互式（Interactive）**的LLM工具使用评估基准，通过隐式状态依赖（State Dependency）、规范化（Canonicalization）和不足信息（Insufficient Information）三类核心挑战，揭示了当前最强LLM在复杂工具调用场景中的显著缺陷。",
      "keyPoints": [
        "<strong>三维评估框架</strong>：Stateful（有状态工具执行与隐式状态依赖）、Conversational（内置LLM用户模拟器支持on-policy对话）、Interactive（动态里程碑评估任意轨迹的中间和最终结果）",
        "<strong>三大核心挑战类别</strong>：State Dependency（工具间隐式依赖世界状态）、Canonicalization（将用户模糊输入规范化为工具参数）、Insufficient Information（工具不足以完成任务时识别并拒绝）",
        "<strong>消息总线架构</strong>：User、Agent、Execution Environment 三个角色通过 Message Bus 通信，每个角色只能访问其可见的消息子视图",
        "<strong>用户模拟器增强</strong>：引入 Knowledge Boundary（知识边界）和 Demonstration（少样本示例对话）两个组件，将幻觉率从12.4%降至6.97%",
        "<strong>Murphy's Law 竞争条件处理</strong>：执行环境检测并发工具调用中的竞争条件时，始终让竞争条件发生以惩罚不当的并行调用",
        "<strong>34 个工具组合的评估矩阵</strong>：覆盖单工具调用/多工具调用、单轮/多轮用户交互的交叉场景",
        "<strong>对 10+ 主流模型全面评估</strong>：开源与闭源模型存在显著性能差距，GPT-4o 综合得分最高，但在 State Dependency 上大模型反而不如中型模型"
      ],
      "detail": "<h5>核心架构：三角色消息总线</h5>\n<p><img alt=\"ToolSandbox 架构图\" src=\"https://arxiv.org/html/2408.04682v1/extracted/5780527/architecture_diagram.png\" />\n<em>图：User、Agent 和 Execution Environment 之间的交互架构。三个角色共享同一个 Message Bus，但各自只能访问有权限的消息子视图。</em></p>\n<p>ToolSandbox 的核心是一个<strong>有状态、对话式、交互式</strong>的三方消息总线系统。三个角色分别是：</p>\n<ol>\n<li><strong>User Role（用户角色）</strong>：由 GPT-4o 驱动的模拟用户，拥有单一工具 <code>end_conversation</code> 用于终止对话。用户模拟器包含三个关键设计：</li>\n<li><strong>Knowledge Boundary</strong>：告知模拟器它应该和不应该知道什么信息，提供对预期结果的部分访问，以对抗幻觉</li>\n<li><strong>Demonstration</strong>：提供少样本示例对话（仅对用户模拟器可见，不对Agent可见）</li>\n<li>\n<p>消融实验（Table 2）表明，两者结合将幻觉率从 12.4% 降至 6.97%，指令遵循错误率从 6.20% 降至 0.77%</p>\n</li>\n<li>\n<p><strong>Agent Role（代理角色）</strong>：接收用户自然语言消息，可选择追问用户或发出工具调用（JSON 对象）。JSON 对象被转换为可执行 Python 代码（见 Appendix A.5），发送到执行环境。</p>\n</li>\n<li>\n<p><strong>Execution Environment Role（执行环境角色）</strong>：类似 IPython/Jupyter 交互式控制台，执行 Python 代码片段。关键机制：</p>\n</li>\n<li>通过 stderr 捕获异常，使 Agent 能够通过试错（trial and error）细化工具调用</li>\n<li><strong>Murphy's Law 竞争条件处理</strong>：对于并行工具调用，如果检测到依赖关系，执行环境<strong>始终</strong>让竞争条件发生，以此惩罚不恰当的并行调用</li>\n</ol>\n<p><img alt=\"消息总线\" src=\"https://arxiv.org/html/2408.04682v1/extracted/5780527/message_bus.png\" />\n<em>图：消息总线中不同角色的消息可见性示意。Execution Environment 可以看到所有消息，Agent 和 User 各有其可见子集。</em></p>\n<h5>三大核心挑战类别</h5>\n<p>ToolSandbox 定义了三种评估任务类别，旨在测试工具使用 LLM 的不同能力维度：</p>\n<p><strong>1. State Dependency（状态依赖）</strong></p>\n<p>这是 ToolSandbox 最核心的创新之一。在现实世界的任务导向对话中，工具调用常常<strong>隐式依赖世界状态（World State）</strong>。例如：\n- 关闭 Wi-Fi 后才能测试离线模式功能\n- 开启蜂窝数据后才能发送短信\n- 多个工具操作同一个数据库，后一个操作依赖前一个操作的结果</p>\n<p>传统基准（BFCL、ToolEval）使用无状态 RESTful API，无法评估这种依赖关系。API-Bank 虽然有状态修改工具，但没有研究状态依赖的影响。</p>\n<p>关键发现：<strong>GPT-4 和 Claude-3-Opus 等大模型在 State Dependency 上反而表现不如中型模型</strong>（GPT-3.5-Turbo、Claude-3-Sonnet），这是因为大模型倾向于对有依赖关系的工具也发出并行调用，而执行环境始终让竞争条件发生。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：嵌套状态依赖尤其棘手。模型常常忘记未解决的问题，无法最优回溯（backtrack），导致重复错误和远超最优的轮次数。</div>\n<p><strong>2. Canonicalization（规范化）</strong></p>\n<p>将用户的模糊、自然语言输入转换为工具的精确参数是一个关键挑战。例如：\n- \"下周五下午\" → 精确的时间戳\n- \"附近的咖啡店\" → 具体的经纬度坐标\n- \"给张三发个消息\" → 张三的电话号码</p>\n<p>ToolSandbox 区分了两种规范化方式：\n- <strong>基于世界知识的规范化</strong>：利用模型内部知识（如著名地标的经纬度）\n- <strong>基于工具的规范化</strong>：通过调用搜索等工具获取规范化的参数</p>\n<p>关键发现：<strong>所有模型在 Canonicalization 上都很挣扎</strong>。大模型倾向于记忆不太可能改变的世界知识（如地标的经纬度），小模型更倾向于使用工具。<strong>时间相关的参数尤其困难</strong>——模型频繁产生时间戳幻觉，错误地规范化相对日期和时间（Figure 14、15）。</p>\n<p>此外，模型在面临歧义时倾向于做出<strong>过早决策</strong>。如 Figure 16 所示，当工具返回多个匹配的地理位置时，模型直接选择第一个，而没有返回用户进行消歧。</p>\n<p><strong>3. Insufficient Information（不足信息）</strong></p>\n<p>这是另一个关键创新：<strong>评估模型在工具不足以完成任务时，是否能识别并拒绝执行，而非产生幻觉</strong>。</p>\n<p><img alt=\"GPT-4 幻觉示例\" src=\"https://arxiv.org/html/2408.04682v1/extracted/5780527/minefield.png\" />\n<em>图：GPT-4 在 Insufficient Information 场景下的错误轨迹。即使工具明显不足以完成任务，模型仍然产生幻觉工具名称或参数。</em></p>\n<p>关键发现：<strong>Insufficient Information 性能与其他类别负相关</strong>——在其他复杂任务上表现越强的模型，在 Insufficient Information 上表现越差。GPT-3.5-Turbo 和 GPT-4 等顶级模型，即使面对简单任务和极少的工具，也会产生工具名称幻觉或参数幻觉（Figure 3、20）。</p>\n<h5>里程碑评估系统</h5>\n<p><img alt=\"里程碑示例\" src=\"https://arxiv.org/html/2408.04682v1/extracted/5780527/intermediate_milestone.png\" />\n<em>图：中间里程碑和最终里程碑的评估示例。每个里程碑有独立的判断条件，允许评估任意轨迹的部分完成度。</em></p>\n<p>ToolSandbox 的评估系统支持<strong>动态评估任意轨迹的中间和最终里程碑</strong>，而不依赖预定义的轨迹或静态的轮次级别指标。这一设计的优势在于：\n- 支持 on-policy 对话评估（而非 off-policy 的预定义轨迹）\n- 可以评估部分完成的情况\n- 通过相似度得分（Similarity Score）综合衡量轨迹质量</p>\n<p><img alt=\"评估轨迹示例\" src=\"https://arxiv.org/html/2408.04682v1/extracted/5780527/introduction_300_dot.png\" />\n<em>图：一个完整的评估轨迹示例，展示了 Message Bus 中的完整对话历史、World State 的可变数据库快照以及各个 Milestones 的判断时机。</em></p>\n<h5>实验结果与关键洞察</h5>\n<p><strong>开源 vs 闭源模型</strong>：\n- GPT-4o 获得最高相似度得分，Claude-3-Opus 紧随其后\n- GPT-4o 在综合得分上领先，但 Claude-3-Opus 在效率上更优（平均轮次数更低，见 Appendix D.2）\n- 开源模型与闭源模型之间存在显著性能差距</p>\n<p><strong>模型规模的影响</strong>：\n- 对比 GPT、Claude 和 Gemini 家族的最大和最小模型，Multiple Tool Call 和 Multiple User Turn 类别的性能退化远快于 Single Tool Call 和 Single User Turn\n- 推理复杂的工具调用序列和模糊的用户请求需要更多的模型容量</p>\n<p><strong>工具干扰</strong>：\n- 增加干扰工具（distraction tools）对 Claude-3-Sonnet 影响最大（下降近 10 个百分点）\n- GPT-4o 对工具描述扰乱（Tool Description Scrambling）特别敏感\n- GPT-4 对参数描述变化（Argument Description）异常关注\n- Gemini-1.5 在参数类型扰乱（Argument Type Scrambling）上表现不佳</p>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>特征</th>\n<th>BFCL</th>\n<th>ToolEval</th>\n<th>API-Bank</th>\n<th><strong>ToolSandbox</strong></th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>有状态工具</td>\n<td>✗</td>\n<td>✗</td>\n<td>部分</td>\n<td><strong>✓</strong></td>\n</tr>\n<tr>\n<td>隐式状态依赖</td>\n<td>✗</td>\n<td>✗</td>\n<td>✗</td>\n<td><strong>✓</strong></td>\n</tr>\n<tr>\n<td>对话式评估</td>\n<td>✗（单轮）</td>\n<td>✗（单轮）</td>\n<td>Off-policy</td>\n<td><strong>On-policy</strong></td>\n</tr>\n<tr>\n<td>用户模拟器</td>\n<td>✗</td>\n<td>✗</td>\n<td>✗</td>\n<td><strong>✓（含Knowledge Boundary+Demonstration）</strong></td>\n</tr>\n<tr>\n<td>竞争条件处理</td>\n<td>N/A</td>\n<td>N/A</td>\n<td>N/A</td>\n<td><strong>Murphy's Law</strong></td>\n</tr>\n<tr>\n<td>评估粒度</td>\n<td>轮次级</td>\n<td>LLM判决</td>\n<td>轨迹级</td>\n<td><strong>里程碑级</strong></td>\n</tr>\n<tr>\n<td>不足信息检测</td>\n<td>✗</td>\n<td>✗</td>\n<td>✗</td>\n<td><strong>✓</strong></td>\n</tr>\n</tbody>\n</table></div>\n<pre><code class=\"language-python\">tools = retrieve_tools(query)\naction = planner.select(query, tools)\nobs = execute(action)\nreturn synthesize_answer(query, obs)\n</code></pre>",
      "quiz": {
        "q": "ToolSandbox 中 Execution Environment 处理并行工具调用的竞争条件时采用什么策略？",
        "options": [
          "随机决定竞争条件的发生顺序",
          "遵循 Murphy's Law，始终让竞争条件发生",
          "自动将并行调用序列化为顺序执行",
          "忽略竞争条件，仅评估最终结果"
        ],
        "answer": 1,
        "explain": "执行环境遵循 Murphy's Law，当检测到依赖工具被并发调用时始终让竞争条件发生，以此惩罚 Agent 不恰当的并行调用行为。这种设计迫使模型学会正确识别工具间的依赖关系。"
      }
    },
    {
      "id": "toolace",
      "num": 11,
      "name": "ToolACE",
      "fullName": "工具调用自演化数据引擎 (ToolACE)",
      "year": "2024.09",
      "org": "SJTU/USTC/Huawei",
      "parent": "toolllm",
      "paperUrl": "https://arxiv.org/abs/2409.00920",
      "projectUrl": "",
      "category": "learning",
      "motivation": "多代理自演化生成高质量调用数据",
      "summary": "ToolACE 是一套全自动化的工具学习数据合成与验证流水线，通过 **TSS（工具自进化合成）→ MAI（多智能体交互对话生成）→ DLV（双层验证）** 三大模块，生成高精度、高多样、高复杂度的函数调用训练数据，使 8B 模型在 BFCL 基准排行榜上超越所有 API 模型和开源模型，夺得第一名。",
      "keyPoints": [
        "<strong>三大模块协同</strong>：TSS 从预训练数据中提取 API 上下文树（30 主域 / 390 子域 / 3398 细粒度域），递归合成 26,507 个多样化 API；MAI 通过用户/助手/工具三智能体交互生成覆盖 Single/Parallel/Dependent 三类函数调用及非工具调用场景的多轮对话；DLV 通过规则检查 + 模型检查双层验证确保数据精度。",
        "<strong>Formalized Thinking + Self-Consistency</strong>：MAI 中助手 Agent 生成每步决策时强制进行\"形式化思考\"，并生成 N 个候选进行多数投票，显著提升生成对话质量（消融实验：最终通过率从 49.8% 提升至 61.8%，提升 10+ 百分点）。",
        "<strong>BFCL 双榜第一</strong>：ToolACE-8B 在 BFCL-v1 以 Overall Accuracy <strong>91.41%</strong>（AST 89.09% / Exec 95.50%）力压 Claude-3.5-Sonnet（90.53%）、GPT-4 系列；在 BFCL-v2 以 <strong>81.26%</strong> 同样居首，且工具相关性检测得分 <strong>89.17%</strong>，遥遥领先。",
        "<strong>Zone of Proximal Development（ZPD）理论驱动复杂度设计</strong>：数据复杂度过低或过高均无效，ToolACE 通过相似性引导的复杂化（Similarity-Guided Complication）和多模式提示（Multi-Mode Prompting）生成难度略高于模型当前能力的数据，使其学习效率最大化。",
        "<strong>格式泛化（Format Generalization）</strong>：训练数据支持 JSON / YAML / XML / Markdown 等多种主流工具描述和调用格式，使模型在实际部署中无需格式适配。"
      ],
      "detail": "<h5>一、Tool Self-Evolution Synthesis（TSS）—— 工具自进化合成模块</h5>\n<p><strong>目标</strong>：自动生成覆盖广泛领域、多样性参数类型和约束条件的 API 定义集合，超越手动收集或简单模板生成的局限。</p>\n<p><strong>三级层次 API 上下文树</strong>：\n- 从 LLM 预训练语料（技术手册、API 文档、产品规范、用户指南、教程等）中提取 API 相关文档\n- 用 LLM 从每篇文档提取 API 领域及所有可能的功能/用例\n- 递归构建形成 <strong>30 个一级域</strong>（如 Entertainment、Education、Finance、Health、Transport）→ <strong>390 个粗粒度子域</strong>（如 Music、Anime、Books）→ <strong>3,398 个细粒度域</strong>（如 Music Streaming、Live Music）\n- 树中每个叶节点代表一个独特功能，叶节点总数约 <strong>十万</strong> 量级</p>\n<p><strong>三大步骤</strong>（如图 Figure 2 所示）：</p>\n<ol>\n<li>\n<p><strong>Speciation（物种形成）</strong>：创建层次化的 API 上下文树，为后续 API 合成提供领域和功能指导。从预训练数据的 API 相关文档出发，用 LLM 提取 API 领域及功能，递归生成子节点。</p>\n</li>\n<li>\n<p><strong>Adaption（适应性调整）</strong>：确定每个 API 的领域归属和复杂度等级。从细粒度域层级采样子树，确保同域内 API 功能区分度。更复杂的 API 覆盖更多上下文树节点，获取更细化、更领域特定的能力；简单 API 可能仅包含单个子节点，聚焦于简单直白的目的。</p>\n</li>\n<li>\n<p><strong>Evolution（进化）</strong>：基于多样性指标持续改进 API 定义。具体操作包括：</p>\n</li>\n<li>添加新功能或参数</li>\n<li>纳入额外约束条件</li>\n<li>变异参数类型</li>\n<li>更新返回结果结构</li>\n<li>支持嵌套类型（如列表的列表、列表的字典）</li>\n</ol>\n<p>维护一个包含多样化 API 样例的缓冲区，迭代从中采样、适配到当前功能子树、生成下一代 API。</p>\n<p><strong>最终产出</strong>：26,507 个独立 API 定义，参数类型丰富度远超其他工具增强数据集（参数类型分布见 Figure 7）。</p>\n<p><strong>对应论文图片</strong>：<img alt=\"Figure 2\" src=\"https://ar5iv.org/html/2409.00920/assets/x2.png\" />（TSS 详细流程，左侧展示 Entertainment 域下的子树示例）</p>\n<h5>二、Multi-Agent Interactive Dialog Generation（MAI）—— 多智能体交互对话生成模块</h5>\n<p><strong>目标</strong>：基于合成 API，通过三个不同角色的 LLM Agent 协同生成高精度、高复杂度的多轮函数调用对话。</p>\n<p><strong>三智能体架构</strong>（Figure 1 中间部分示意）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>Agent</th>\n<th>角色</th>\n<th>功能</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>User Agent</strong> (θ_u)</td>\n<td>模拟用户</td>\n<td>发出请求/提供补充信息；由多模式提示和相似性引导复杂化策略驱动，控制对话多样性和复杂度；采样用户风格（style）和用户模板（template）以变异表达方式</td>\n</tr>\n<tr>\n<td><strong>Assistant Agent</strong> (θ_a)</td>\n<td>模拟助手</td>\n<td>决策行动空间：调用 API、请求更多信息、总结工具反馈、提供非工具回答；每步动作前执行 <strong>Formalized Thinking（形式化思考）</strong> + <strong>Self-Consistency（自一致性）</strong> 多数投票</td>\n</tr>\n<tr>\n<td><strong>Tool Agent</strong> (θ_t)</td>\n<td>模拟 API 执行器</td>\n<td>接收助手提供的工具描述和输入参数，输出模拟的执行结果；支撑依赖型函数调用的多步顺序执行</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>对话框类型</strong>（Dialog Diversity）：\n1. <strong>Simple（简单）</strong>：单轮单次函数调用\n2. <strong>Parallel（并行）</strong>：单轮同时调用多个相互独立的函数\n3. <strong>Dependent（依赖）</strong>：多步顺序调用，后续调用依赖于前一步的工具返回结果\n4. <strong>Non-tool-use（无工具）</strong>：不需要调用任何 API 的常规对话（防止模型过触发工具调用）</p>\n<p><strong>Formalized Thinking 形式化思考</strong>：\n- 助手 Agent 在每次决策时，将推理过程明确拆分为：① 是否需要调用工具？② 选择哪个 API？③ 如何填充参数？④ 可选参数如何处理？\n- 随即通过 <strong>Self-Consistency</strong> 机制生成 N 个候选响应（C_a^1, C_a^2, ..., C_a^N）\n- 比较各候选的<strong>工具调用部分</strong>是否一致：若不一致 → 丢弃该轮或添加 loss mask；若一致 → 通过多数投票选择最终响应\n- 消融实验验证效果显著（见下文消融实验部分）</p>\n<p><strong>Algorithm 1 完整伪代码</strong>：</p>\n<pre><code>Algorithm 1: MAI Dialog Generation\n\n1: Initialization: Sampled API list A, Dialog D_0 = [], Target Turn Length N_t\n2: Definition: User Agent θ_u and output C_u, Assistant Agent θ_a and output C_a, Tool Agent θ_t and output C_t\n3: for t = 1, 2, ..., N_t do\n4:     Sample user template p and user style s\n5:     C_u = θ_u(D_{t-1}, A, p, s)\n6:     C_a^1, ..., C_a^N = θ_a(C_u, D_{t-1}, A)  ▷ 用形式化思考生成 N 个响应\n7:     if C_a^1 ≠ C_a^2 ≠ ... ≠ C_a^N then  ▷ 只检查工具调用部分的一致性\n8:         Continue or Add Loss Mask  ▷ 丢弃该轮或添加 loss mask\n9:     else\n10:        C_a = MajorVote(C_a^1, ..., C_a^N)\n11:    end if\n12:    D_t = D_{t-1} + [C_u, C_a]\n13:    while Tool calling in C_a do  ▷ 依赖型函数需要多次顺序调用\n14:        C_t = θ_t(C_a, A)               ▷ 工具执行\n15:        C_a = θ_a(C_t, D_t, A)          ▷ 助手基于工具反馈生成新响应\n16:        D_t = D_t + [C_t, C_a]\n17:    end while\n18: end for\n</code></pre>\n<p><strong>对应论文图片</strong>：<img alt=\"Figure 1\" src=\"https://ar5iv.org/html/2409.00920/assets/x1.png\" />（ToolACE 整体框架）；<img alt=\"Figure 3\" src=\"https://ar5iv.org/html/2409.00920/assets/x3.png\" />（API 定义和函数调用的 JSON 格式示例）</p>\n<h5>三、Dual-Layer Validation Process（DLV）—— 双层验证系统</h5>\n<p><strong>目标</strong>：双阶段验证确保生成数据的准确性——先做快速规则检查剔除明显错误，再做深度模型检查捕捉语义问题。</p>\n<p><strong>第一层：Rule Verification（规则验证，基于代码的检查器）</strong>\n- 自动检测格式错误（JSON 格式合法性、必需字段完整性等）\n- 自动检测逻辑矛盾（参数类型不匹配、引用了不存在的 API、必填参数缺失等）\n- 可检测的错误类型示例见 <strong>Figure 4</strong>（包括：幻觉参数名、错误 JSON 语法、参数类型不匹配、参数值格式不合法等）</p>\n<p><strong>第二层：Model Verification（模型验证，基于 LLM 的检查器）</strong>\n- 对于规则验证难以捕获的语义级错误（如工具选择是否正确、参数语义是否合理、可选参数处理是否恰当），使用 LLM 作为裁判进行深度审核\n- 通过精心设计的 prompt 模板，让 LLM 判断对话与 API 定义之间的语义一致性</p>\n<p><strong>消融实验——Formalized Thinking 效果</strong>（Table 5）：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>方法</th>\n<th style=\"text-align: center;\">规则层通过率</th>\n<th style=\"text-align: center;\">模型层通过率</th>\n<th style=\"text-align: center;\">最终通过率</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><strong>With FT</strong></td>\n<td style=\"text-align: center;\">67.9%</td>\n<td style=\"text-align: center;\">91.1%</td>\n<td style=\"text-align: center;\"><strong>61.8%</strong></td>\n</tr>\n<tr>\n<td>W/O FT</td>\n<td style=\"text-align: center;\">56.1%</td>\n<td style=\"text-align: center;\">88.7%</td>\n<td style=\"text-align: center;\">49.8%</td>\n</tr>\n</tbody>\n</table></div>\n<p>→ 加入形式化思考后，最终通过率绝对提升 <strong>12 个百分点</strong>，模型验证层通过率提升 2.4 个百分点，规则层提升 11.8 个百分点。</p>\n<p><strong>消融实验——验证系统各层效果</strong>（Figure 11）：用 LoRA 在三种数据集上微调 LLaMA3.1-8B-Instruct：\n1. <code>w.o. dual</code> —— 完全无验证（基线最差）\n2. <code>w.o. model</code> —— 仅规则验证（中等，验证了规则层有效性）\n3. <code>Final</code> —— 双层验证（最优，BFCL 可执行准确率和综合准确率均最高）</p>\n<p>→ 双层验证缺一不可，共同保障最终模型性能达到最优。</p>\n<p><strong>对应论文图片</strong>：<img alt=\"Figure 4\" src=\"https://ar5iv.org/html/2409.00920/assets/x4.png\" />（规则验证检测到的错误示例）；<img alt=\"Figure 5\" src=\"https://ar5iv.org/html/2409.00920/assets/x5.png\" />（双层验证各层通过率统计）</p>\n<h5>四、核心实验成果</h5>\n<p><strong>ToolACE-8B 在 BFCL-v1 排行榜（Table 3，前 15 名）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: center;\">Rank</th>\n<th>Model</th>\n<th style=\"text-align: center;\">Overall Accuracy</th>\n<th style=\"text-align: center;\">AST</th>\n<th style=\"text-align: center;\">Exec</th>\n<th style=\"text-align: center;\">Relevance</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: center;\"><strong>1</strong></td>\n<td><strong>ToolACE-8B (FC)</strong></td>\n<td style=\"text-align: center;\"><strong>91.41</strong></td>\n<td style=\"text-align: center;\">89.09</td>\n<td style=\"text-align: center;\">95.50</td>\n<td style=\"text-align: center;\">89.17</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">2</td>\n<td>Claude-3.5-Sonnet-0620 (Prompt)</td>\n<td style=\"text-align: center;\">90.53</td>\n<td style=\"text-align: center;\">88.55</td>\n<td style=\"text-align: center;\">95.00</td>\n<td style=\"text-align: center;\">84.17</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">3</td>\n<td>Functionary-Medium-v3.1 (FC)</td>\n<td style=\"text-align: center;\">88.88</td>\n<td style=\"text-align: center;\">86.18</td>\n<td style=\"text-align: center;\">95.00</td>\n<td style=\"text-align: center;\">81.25</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">4</td>\n<td>xLAM-7b-fc-r (FC)</td>\n<td style=\"text-align: center;\">88.76</td>\n<td style=\"text-align: center;\">86.36</td>\n<td style=\"text-align: center;\">93.50</td>\n<td style=\"text-align: center;\">85.00</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">5</td>\n<td>GPT-4-1106-Preview (Prompt)</td>\n<td style=\"text-align: center;\">88.53</td>\n<td style=\"text-align: center;\">88.91</td>\n<td style=\"text-align: center;\">95.50</td>\n<td style=\"text-align: center;\">72.50</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">...</td>\n<td>...</td>\n<td style=\"text-align: center;\">...</td>\n<td style=\"text-align: center;\">...</td>\n<td style=\"text-align: center;\">...</td>\n<td style=\"text-align: center;\">...</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">15</td>\n<td>Gorilla-OpenFunctions-v2 (FC)</td>\n<td style=\"text-align: center;\">85.41</td>\n<td style=\"text-align: center;\">87.82</td>\n<td style=\"text-align: center;\">—</td>\n<td style=\"text-align: center;\">—</td>\n</tr>\n</tbody>\n</table></div>\n<p><strong>关键结论</strong>：\n1. <strong>8B 小模型超越千亿级 API 闭源模型</strong>：ToolACE-8B 不仅超过所有同规模模型，还超越了 GPT-4 全系列、Claude-3.5-Sonnet 等顶级闭源 API 模型。\n2. <strong>与同基座对比</strong>：ToolACE-8B 与 Functionary-Small-v3.2 均基于 LLaMA3.1-8B-Instruct 微调，但 ToolACE-8B 在所有类别上均显著领先，直接证明 ToolACE 数据合成的优越性。\n3. <strong>工具相关性最强</strong>：Relevance 得分 89.17%，超过第二名 4.59 个百分点，反映模型能精准判断何时需要/不需要调用工具。</p>\n<p><strong>BFCL-v2 排行榜（Table 4，前 5 名）</strong>：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th style=\"text-align: center;\">Rank</th>\n<th>Model</th>\n<th style=\"text-align: center;\">Overall Accuracy</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align: center;\"><strong>1</strong></td>\n<td><strong>ToolACE-8B (FC)</strong></td>\n<td style=\"text-align: center;\"><strong>81.26</strong></td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">2</td>\n<td>GPT-4o-mini-2024-07-18 (FC)</td>\n<td style=\"text-align: center;\">80.55</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">3</td>\n<td>GPT-4o-mini-2024-07-18 (Prompt)</td>\n<td style=\"text-align: center;\">80.19</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">4</td>\n<td>Claude-3.5-Sonnet-0620 (Prompt)</td>\n<td style=\"text-align: center;\">79.76</td>\n</tr>\n<tr>\n<td style=\"text-align: center;\">5</td>\n<td>GPT-4-turbo-2024-04-09 (Prompt)</td>\n<td style=\"text-align: center;\">79.66</td>\n</tr>\n</tbody>\n</table></div>\n<p>→ v2 版本难度更高，ToolACE-8B 依然稳居榜首，且是唯一进入前 10 的 8B 以下开源模型。</p>\n<p><strong>数据多样性统计</strong>：\n- <strong>一级域分布</strong>（Figure 6）：Entertainment、Technology、Business 占比最高\n- <strong>参数类型分布</strong>（Figure 7）：涵盖 string、integer、boolean、array、object、float 以及各类嵌套组合\n- <strong>数据类别分布</strong>（Figure 8）：训练数据覆盖丰富的数据类型和约束组合\n- <strong>复杂度分布</strong>（Figure 10）：归一化复杂度分在 [0,1] 区间呈偏右分布，确保大量数据处于 ZPD 最优难度区</p>\n<p><strong>格式泛化能力</strong>（Figure 9）：模型在 JSON / YAML / XML / Markdown 四种格式下均能正确解析工具定义并生成对应格式的调用，训练阶段即支持多种格式交替，避免过拟合单一格式。</p>\n<h5>五、其他关键图表</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>图表</th>\n<th>内容</th>\n<th>链接</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Figure 1</td>\n<td>ToolACE 整体框架（TSS + MAI + DLV）</td>\n<td><a href=\"https://ar5iv.org/html/2409.00920/assets/x1.png\">x1.png</a></td>\n</tr>\n<tr>\n<td>Figure 2</td>\n<td>TSS 详细流程（含 API Context Tree 示例）</td>\n<td><a href=\"https://ar5iv.org/html/2409.00920/assets/x2.png\">x2.png</a></td>\n</tr>\n<tr>\n<td>Figure 3</td>\n<td>API 定义和函数调用 JSON 格式示例</td>\n<td><a href=\"https://ar5iv.org/html/2409.00920/assets/x3.png\">x3.png</a></td>\n</tr>\n<tr>\n<td>Figure 4</td>\n<td>规则验证检测到的错误示例</td>\n<td><a href=\"https://ar5iv.org/html/2409.00920/assets/x4.png\">x4.png</a></td>\n</tr>\n<tr>\n<td>Figure 5</td>\n<td>DLV 中规则验证和模型验证的通过率</td>\n<td><a href=\"https://ar5iv.org/html/2409.00920/assets/x5.png\">x5.png</a></td>\n</tr>\n<tr>\n<td>Figure 6</td>\n<td>所有 API 的一级域分布统计</td>\n<td><a href=\"https://ar5iv.org/html/2409.00920/assets/x6.png\">x6.png</a></td>\n</tr>\n<tr>\n<td>Figure 7</td>\n<td>参数类型分布</td>\n<td><a href=\"https://ar5iv.org/html/2409.00920/assets/x7.png\">x7.png</a></td>\n</tr>\n<tr>\n<td>Figure 8</td>\n<td>数据类别分布</td>\n<td><a href=\"https://ar5iv.org/html/2409.00920/assets/x8.png\">x8.png</a></td>\n</tr>\n<tr>\n<td>Figure 9</td>\n<td>函数调用格式泛化</td>\n<td><a href=\"https://ar5iv.org/html/2409.00920/assets/x9.png\">x9.png</a></td>\n</tr>\n<tr>\n<td>Figure 10</td>\n<td>单次数据复杂度分数分布</td>\n<td><a href=\"https://ar5iv.org/html/2409.00920/assets/x10.png\">x10.png</a></td>\n</tr>\n<tr>\n<td>Figure 11</td>\n<td>验证系统消融实验（w.o. dual / w.o. model / Final）</td>\n<td><a href=\"https://ar5iv.org/html/2409.00920/assets/x11.png\">x11.png</a></td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "ToolACE 中 DLV（双层验证）的主要作用是什么？",
        "options": [
          "把所有 API 自动部署成真实在线服务",
          "先用规则检查过滤格式与参数错误，再用模型检查补足语义级错误",
          "把单轮对话全部改写成多轮对话",
          "在推理时替代 LLM 生成工具调用"
        ],
        "answer": 1,
        "explain": "DLV 的核心是规则层抓显式错误、模型层抓语义错误，两层叠加保证生成训练数据的准确率。"
      }
    },
    {
      "id": "mcp",
      "num": 12,
      "name": "MCP",
      "fullName": "模型上下文协议 (Model Context Protocol)",
      "year": "2024.11",
      "org": "Anthropic",
      "parent": "—",
      "paperUrl": "https://www.anthropic.com/news/model-context-protocol?stargate_lang=en",
      "projectUrl": "",
      "category": "protocol",
      "motivation": "统一工具资源提示的JSON-RPC接口",
      "summary": "MCP 提出了一个基于 JSON-RPC 2.0 的客户端-服务器协议标准，统一了 AI 助手与外部数据源（内容仓库、业务工具、开发环境）之间的上下文交换方式，解决了多工具集成中\"M×N 集成问题\"。",
      "keyPoints": [
        "提出 MCP 开放协议标准，将 AI 应用与工具/数据源的连接从\"每个模型×每个工具\"的碎片化集成转变为统一的一次性集成范式",
        "采用客户端-服务器架构，定义三类参与者：MCP Host（AI 应用）、MCP Client（连接管理器）、MCP Server（上下文提供者）",
        "双层协议设计：Data Layer 定义 JSON-RPC 2.0 消息语义（生命周期管理、核心原语），Transport Layer 抽象通信机制",
        "支持两种传输方式：Stdio Transport（本地进程间通信）和 Streamable HTTP Transport（远程服务器通信，含 SSE 流式推送）",
        "核心 Server Primitives 包括 Tools（供 AI 调用的操作）、Resources（结构化上下文数据）、Prompts（交互模板）",
        "核心 Client Primitives 包括 Sampling（请求 Host LLM 采样）、Elicitation（请求用户输入）、Logging（日志回传）",
        "有状态协议：生命周期分 Initialization（能力协商）、Operation（正常通信）、Shutdown（优雅关闭）三阶段",
        "提供多语言 SDK（TypeScript/Python 等）和开发工具（MCP Inspector），参考实现覆盖文件系统、Sentry、GitHub 等"
      ],
      "detail": "<p><img alt=\"MCP 架构示意图\" src=\"https://modelcontextprotocol.io/images/mcp-simple-diagram.png\" /></p>\n<p><em>图：MCP 协议的客户端-服务器架构，Host 通过多个 Client 实例连接不同 Server，统一上下文交换</em></p>\n<h5>动机与背景</h5>\n<p>传统 AI 助手集成外部工具时面临\"M×N 集成问题\"：每新增一个 AI 应用或工具，都需要为每个组合编写定制适配代码，导致工程碎片化严重。Anthropic 在 2024 年 11 月 25 日开源 MCP，目标是成为\"AI 应用的 USB-C 接口\"——一个统一标准，使任何 AI 应用（Claude、VS Code 等）能够通过同一协议连接到任何提供上下文的工具或数据源。</p>\n<h5>核心架构与交互流程</h5>\n<p>MCP 的架构围绕三类参与者展开：</p>\n<ol>\n<li><strong>MCP Host</strong>：实际的 AI 应用（如 Claude Desktop、Claude Code、VS Code），负责协调管理多个 MCP Client</li>\n<li><strong>MCP Client</strong>：为每个 MCP Server 创建一个独立的客户端连接实例，维护与该 Server 的 1:1 连接</li>\n<li><strong>MCP Server</strong>：提供上下文数据的程序，可运行在本地（Stdio 传输）或远程（Streamable HTTP 传输）</li>\n</ol>\n<p>连接建立后经历三阶段生命周期：</p>\n<pre><code>初始化阶段 (Initialization)\n  Client → Server: initialize 请求（携带 protocolVersion、capabilities、clientInfo）\n  Server → Client: 响应（返回 server capabilities、serverInfo）\n  Client → Server: notifications/initialized 通知\n  ↓\n操作阶段 (Operation)\n  双向 JSON-RPC 2.0 消息交换：\n    - tools/list, tools/call（工具发现与调用）\n    - resources/list, resources/read（资源枚举与读取）\n    - prompts/list, prompts/get（提示模板获取）\n    - sampling/createMessage（Client 请求 Host LLM 采样）\n    - elicitation/create（Client 请求用户输入）\n  ↓\n关闭阶段 (Shutdown)\n  Client → Server: shutdown 请求\n  Server → Client: 响应确认\n  连接断开\n</code></pre>\n<h5>核心原语（Primitives）</h5>\n<p><strong>Server 端原语</strong>使 AI 应用能够发现和利用外部能力：</p>\n<ul>\n<li><strong>Tools</strong>：模型可调用的远程操作。Server 暴露 <code>tools/list</code> 列出可用工具及其 JSON Schema 参数定义，Client 通过 <code>tools/call</code> 发起实际调用。典型用途包括查询数据库、发送消息、操作文件系统</li>\n<li><strong>Resources</strong>：结构化的只读数据资源。通过 URI 标识，Server 提供 <code>resources/list</code> 和 <code>resources/read</code>，支持静态资源和动态模板（如 <code>users://{userId}/profile</code>）。可选订阅机制（<code>resources/subscribe</code>）在资源变化时推送通知</li>\n<li><strong>Prompts</strong>：预定义的交互模板，帮助用户和模型以标准化方式启动特定任务（如代码审查、数据分析）</li>\n</ul>\n<p><strong>Client 端原语</strong>让 Server 能反向利用 Host 的能力：</p>\n<ul>\n<li><strong>Sampling</strong>：Server 通过 <code>sampling/createMessage</code> 请求 Host LLM 生成补全内容，支持指定角色（user/assistant）、上下文包含、模型偏好等参数</li>\n<li><strong>Elicitation</strong>：Server 通过 <code>elicitation/create</code> 向终端用户请求输入，支持表单模式和 URL 模式，可要求必填验证</li>\n<li><strong>Logging</strong>：Server 通过 <code>notifications/logging</code> 向 Client 发送结构化日志，支持 debug/info/warning/error 级别</li>\n</ul>\n<h5>与传统方法的区别</h5>\n<div class=\"key-point\">💡 关键：MCP 与 Function Calling 和传统 Plugin 系统有本质区别</div>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统 Function Calling</th>\n<th>传统 Plugin 系统</th>\n<th>MCP</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>集成方式</td>\n<td>每个模型单独定义函数</td>\n<td>每个平台单独开发插件</td>\n<td>统一协议，一次对接</td>\n</tr>\n<tr>\n<td>可移植性</td>\n<td>绑定特定模型/平台</td>\n<td>绑定特定平台</td>\n<td>跨模型、跨应用复用</td>\n</tr>\n<tr>\n<td>传输层</td>\n<td>通常同进程</td>\n<td>各异</td>\n<td>Stdio + Streamable HTTP 双模</td>\n</tr>\n<tr>\n<td>状态管理</td>\n<td>无状态请求</td>\n<td>各实现不同</td>\n<td>有状态生命周期协议</td>\n</tr>\n<tr>\n<td>能力发现</td>\n<td>静态定义</td>\n<td>静态清单</td>\n<td>动态协商 capabilities</td>\n</tr>\n</tbody>\n</table></div>\n<p>MCP 的创新在于将工具集成的标准化从\"应用层\"下沉到\"协议层\"，使得 Server 开发者只需实现一次 MCP 接口，即可被任何 MCP-compatible Host 使用——无论 Host 内部使用 Claude、GPT 还是其他模型。</p>\n<h5>传输层详解</h5>\n<p>MCP 的 Transport Layer 抽象了通信细节，使 Data Layer 的 JSON-RPC 消息在两种传输机制上统一运作：</p>\n<ul>\n<li><strong>Stdio Transport</strong>：通过标准输入/输出流通信。Server 作为子进程由 Client 启动，消息以换行符分隔的 JSON 帧发送。零网络开销，适合本地工具集成。仅服务单个 Client</li>\n<li><strong>Streamable HTTP Transport</strong>：通过 HTTP POST 发送 Client→Server 消息，Server 可选通过 Server-Sent Events (SSE) 向 Client 推送流式响应和通知。支持标准 HTTP 认证（Bearer Token、API Key、自定义 Header），推荐 OAuth 获取令牌。可服务多个 Client 并发连接</li>\n</ul>\n<div class=\"warn-box\">⚠️ 注意：HTTP 传输模式下需要特殊的\"伪 GET\"升级握手——Client 先发送 <code>Accept: text/event-stream</code> 的 GET 请求建立 SSE 通道，之后 POST 请求才能携带通知</div>\n<h5>消息格式（JSON-RPC 2.0 基础）</h5>\n<p>所有 MCP 消息遵循标准 JSON-RPC 2.0 格式：</p>\n<ul>\n<li><strong>Request</strong>：<code>{\"jsonrpc\":\"2.0\",\"id\":&lt;id&gt;,\"method\":\"&lt;method&gt;\",\"params\":{...}}</code></li>\n<li><strong>Response</strong>：<code>{\"jsonrpc\":\"2.0\",\"id\":&lt;id&gt;,\"result\":{...}}</code> 或 Error：<code>{\"jsonrpc\":\"2.0\",\"id\":&lt;id&gt;,\"error\":{\"code\":&lt;code&gt;,\"message\":\"...\"}}</code></li>\n<li><strong>Notification</strong>：<code>{\"jsonrpc\":\"2.0\",\"method\":\"notifications/&lt;name&gt;\",\"params\":{...}}</code>（无 id，无响应）</li>\n</ul>\n<h5>生态与现状</h5>\n<p>MCP 自 2024 年 11 月发布以来迅速获得行业采纳。官方提供 TypeScript 和 Python SDK，包含 MCP Inspector 调试工具。参考 Server 实现涵盖文件系统访问、数据库查询（Postgres/SQLite）、GitHub API、Brave Search、Sentry 错误追踪等。第三方社区已贡献数百个 MCP Server，覆盖云服务、开发工具、知识管理等领域。规范仓库托管于 <code>github.com/modelcontextprotocol/specification</code>，以 MIT 许可证开源。</p>",
      "quiz": {
        "q": "MCP 协议中，Server 想要让 AI Host 生成一段文本时，应该使用哪个 Client 端原语？",
        "options": [
          "tools/call，调用文本生成工具",
          "resources/read，读取文本资源",
          "sampling/createMessage，请求 LLM 采样补全",
          "elicitation/create，请求用户输入文本"
        ],
        "answer": 2,
        "explain": "sampling/createMessage 是 MCP 定义的 Client Primitives 之一，允许 Server 反向请求 Host 的 LLM 进行采样/补全。这是让外部工具驱动 AI 生成内容的标准路径。"
      }
    },
    {
      "id": "acebench",
      "num": 13,
      "name": "ACEBench",
      "fullName": "工具使用综合评测 (ACEBench)",
      "year": "2025.01",
      "org": "USTC/Huawei/SJTU",
      "parent": "toolsandbox",
      "paperUrl": "https://arxiv.org/abs/2501.12851",
      "projectUrl": "",
      "category": "evaluation",
      "motivation": "以Normal/Special/Agent三类场景细分工具评测",
      "summary": "ACEBench 提出了一套覆盖 **Normal / Special / Agent** 三类场景的细粒度工具使用基准，用统一而低开销的自动化评测流程同时考察基础工具调用、含歧义或不完整指令，以及真实多轮代理交互。",
      "keyPoints": [
        "把评测数据分成 <strong>Normal、Special、Agent</strong> 三类，而不是只看单一成功率。",
        "覆盖 <strong>8 个大域、68 个子域、4,538 个中英双语 API</strong>，数据规模明显大于很多早期工具基准。",
        "数据集包含约 <strong>2,000</strong> 条高质量测试样本，其中 Agent 类专门用于模拟真实多轮对话和环境交互。",
        "设计了 <strong>自动化且不依赖真实 API 执行</strong> 的评估框架，降低了成本并提升了复现实验稳定性。",
        "相比只测单轮调用的基准，ACEBench 更强调 <strong>歧义指令、缺失信息、交互式代理行为</strong> 的区分诊断。"
      ],
      "detail": "<p><img alt=\"ACEBench 数据构成图\" src=\"https://raw.githubusercontent.com/chenchen0103/ACEBench/main/fig/data_composition.png\" /></p>\n<p><em>图：ACEBench 的数据构成。基准把样本拆成 Normal、Special、Agent 三大类，而不是把所有工具调用场景混成一个总分。</em></p>\n<h5>动机：为什么现有工具基准还不够</h5>\n<p>ACEBench 论文对旧基准的批评很明确，主要有三点：</p>\n<ul>\n<li><strong>场景不够真实</strong>：很多基准只有单轮工具调用，缺少真实多轮对话。</li>\n<li><strong>维度不够细</strong>：往往只有“对/错”或端到端成功率，难以看出模型具体栽在哪类场景。</li>\n<li><strong>评估成本高</strong>：有些方案依赖真实 API 执行或 LLM 评委，难以大规模、稳定复现。</li>\n</ul>\n<p>所以 ACEBench 的设计目标不是再做一个更大的“工具调用题库”，而是把工具使用拆成几类本质不同的问题，并尽量用统一自动流程做评测。</p>\n<h5>三类数据：Normal / Special / Agent</h5>\n<p>ACEBench 的核心不是错误标签，而是 <strong>评测场景类型</strong>：</p>\n<p><strong>1. Normal</strong></p>\n<p>最基础的工具使用场景，重点看模型能否：</p>\n<ul>\n<li>选对工具；</li>\n<li>填对参数；</li>\n<li>生成正确格式的调用。</li>\n</ul>\n<p>这类样本类似“标准函数调用题”，主要衡量基础 tool use 能力。</p>\n<p><strong>2. Special</strong></p>\n<p>这一类专门测试现实里常见但更麻烦的情况：</p>\n<ul>\n<li>用户指令含糊；</li>\n<li>信息不完整；</li>\n<li>需要补问或澄清；</li>\n<li>可能根本无法完成。</li>\n</ul>\n<p>这也是当前很多模型的薄弱环节，因为它们经常在信息不足时“猜一个调用”，而不是停下来澄清。</p>\n<p><strong>3. Agent</strong></p>\n<p>Agent 类是 ACEBench 最重要的扩展。它不再只看单步调用，而是构造 <strong>多轮用户-环境-代理交互</strong>，考察：</p>\n<ul>\n<li>工具调用链是否合理；</li>\n<li>中间状态是否被正确利用；</li>\n<li>多轮交互里是否能持续保持目标；</li>\n<li>在环境反馈变化时是否会修正策略。</li>\n</ul>\n<p>这部分是 ACEBench 区分于很多旧工具基准的核心价值。</p>\n<h5>数据构建与验证</h5>\n<p>ACEBench 覆盖技术、金融、娱乐、社会、健康、文化、环境等多个领域，共 <strong>8 大域、68 子域、4,538 个 API</strong>。论文还强调：</p>\n<ul>\n<li>数据是 <strong>中英双语</strong> 的；</li>\n<li>Special 与 Agent 数据不是简单模板拼接，而是专门设计含歧义与交互性的样本；</li>\n<li>构建流程包含自动化质量检查、模型辅助验证和人工审核，避免工具描述或标注本身出错。</li>\n</ul>\n<p>从工程视角看，这意味着 ACEBench 不是只追求“大”，而是把数据质量和评测分层一起做了。</p>\n<h5>评测框架：按类型分别打分</h5>\n<p>ACEBench 的评估思路可以简化成：</p>\n<pre><code class=\"language-python\">def evaluate(sample, model_output):\n    if sample.type == &quot;normal&quot;:\n        return eval_normal_tool_call(sample, model_output)\n    if sample.type == &quot;special&quot;:\n        return eval_ambiguous_or_incomplete_case(sample, model_output)\n    if sample.type == &quot;agent&quot;:\n        return eval_multi_turn_agent_trace(sample, model_output)\n</code></pre>\n<p>这背后的思想很重要：<strong>同一个模型在三类场景里失败原因完全不同</strong>。</p>\n<ul>\n<li>在 Normal 上失败，通常说明基础函数调用能力不足；</li>\n<li>在 Special 上失败，往往说明缺乏澄清、拒答或处理不完整约束的能力；</li>\n<li>在 Agent 上失败，则更接近规划、记忆和交互式执行问题。</li>\n</ul>\n<p>因此，ACEBench 的总分有意义，但更重要的是 <strong>分类型诊断</strong>。</p>\n<h5>与旧基准的区别</h5>\n<p>和 API-Bank、ToolLLM、StableToolBench、ToolSandbox 这类基准相比，ACEBench 的定位更偏“综合诊断”：</p>\n<ul>\n<li>它不像 BFCL 那样主要聚焦函数调用结构；</li>\n<li>也不像 ToolSandbox 那样主打 stateful 环境与世界状态依赖；</li>\n<li>它更像把 <strong>基础调用、复杂边界条件、真实代理交互</strong> 拉到同一个评测体系下。</li>\n</ul>\n<p>论文声称，ACEBench 是少数能同时覆盖：</p>\n<ul>\n<li>多轮对话</li>\n<li>细粒度工具评测</li>\n<li>复杂边界条件</li>\n<li>自动化可复现流程</li>\n</ul>\n<p>的综合型基准。</p>\n<h5>为什么这篇工作重要</h5>\n<p>ACEBench 的真正价值，在于它把“工具使用失败”拆成了更可操作的工程问题：</p>\n<ul>\n<li>如果 Normal 差，先补 schema、参数与格式遵循；</li>\n<li>如果 Special 差，补澄清、拒答、信息不足判断；</li>\n<li>如果 Agent 差，补规划、记忆和多轮交互。</li>\n</ul>\n<p>这种拆法，比只看一个 Overall Accuracy 更接近真实部署诊断。</p>\n<div class=\"warn-box\">⚠️ 注意：ACEBench 仍然是 benchmark，不是训练方法。它能更好地暴露问题，但不会自动解决模型的 tool use 缺陷。</div>",
      "quiz": {
        "q": "ACEBench 中哪一类数据最直接用于测试含歧义或信息不完整的工具使用场景？",
        "options": [
          "Normal",
          "Special",
          "Agent",
          "Overall"
        ],
        "answer": 1,
        "explain": "Special 类专门针对 ambiguous or incomplete instructions，测试模型是否会澄清、拒绝或在缺信息时避免盲目调用工具。"
      }
    },
    {
      "id": "bfcl",
      "num": 14,
      "name": "BFCL",
      "fullName": "伯克利函数调用排行榜 (BFCL)",
      "year": "2025.05",
      "org": "UC Berkeley",
      "parent": "gorilla",
      "paperUrl": "https://openreview.net/forum?id=2GmDdhBdDk",
      "projectUrl": "",
      "category": "evaluation",
      "motivation": "以AST与执行统一函数调用评测",
      "summary": "BFCL 把函数调用评测从“少量 Python function call 样例”扩展为覆盖多语言、多调用模式、AST 校验与真实执行校验的大规模统一基准，并进一步把多步、带状态、需要 abstain 的 agentic function calling 纳入排行榜，成为函数调用能力评测的事实标准。",
      "keyPoints": [
        "提出 Berkeley Function Calling Leaderboard，系统评估 serial、multiple、parallel、parallel-multiple 等函数调用场景",
        "覆盖 Python、Java、JavaScript、REST API、SQL 等多种语言/接口形式，而不是局限于单一 JSON schema",
        "设计 AST evaluation 与 executable evaluation 两套互补评测方式，以结构正确性和真实可执行性双重检查结果",
        "数据由专家构造与用户贡献函数共同组成，目标是接近真实工具使用分布而不是玩具合成任务",
        "不只测“该不该调、怎么调”，还测 abstain、memory、stateful multi-step、dynamic decision-making 等 agentic 能力",
        "OpenReview 版本明确指出：最强模型在单轮函数调用上已很强，但记忆、长时推理和动态决策仍是明显短板",
        "论文与配套网站共同把 BFCL 推成函数调用评测的公共基准与持续更新排行榜"
      ],
      "detail": "<p><img alt=\"BFCL 排行榜总览\" src=\"https://gorilla.cs.berkeley.edu/assets/img/blog_post_8_Leaderboard.png\" />\n<em>图：BFCL 官方排行榜把 AST、执行、relevance detection、成本与延迟等指标放在同一张面板里展示。</em></p>\n<pre><code class=\"language-python\"># BFCL 的核心评测流程（按论文/官方说明概括）\nfor sample in benchmark:\n    prediction = model.generate_function_call(sample.prompt, sample.functions)\n    ast_ok = ast_match(prediction, sample.reference_calls)\n    exec_ok = maybe_execute(prediction, sample.runtime)\n    abstain_ok = check_relevance_or_abstain(prediction, sample.label)\n    record(sample.category, ast_ok, exec_ok, abstain_ok)\naggregate_by(simple, multiple, parallel, relevance, latency, cost)\n</code></pre>\n<p>BFCL 解决的是函数调用评测里两个最老的问题。第一，什么叫“调用对了”？如果只做字符串精确匹配，很多语义等价调用会被误判；第二，真实世界的函数形式非常多，过去的小型 benchmark 很难覆盖。论文因此把评测问题拆成 AST evaluation 与 executable evaluation。</p>\n<p>这让 BFCL 不再只是“让模型补一个 JSON”。它同时考察 multiple function selection、parallel invocation、relevance detection，以及在没有合适函数时能否 abstain。OpenReview 版本进一步把多步、带状态的 agentic setting 纳入评测。</p>\n<p>从方法论上看，BFCL 最重要的贡献是把函数调用从“模型功能演示”变成“可持续、可比较、可扩展的公共评测基础设施”。多语言、多类型函数、多粒度场景以及排行榜持续更新，共同让它成为后续 tool-use / agentic evaluation 工作默认会引用的基准。</p>\n<p>因此在 <code>tool_use</code> 专题里，BFCL 的定位不只是一个 benchmark，而是“函数调用评测方法学”的拐点：从静态 schema 匹配转向结构校验、真实执行和 agentic long-horizon 分层评估。</p>\n<div class=\"key-point\">💡 关键：AST evaluation 的作用不是替代真实执行，而是在无法统一执行所有语言/接口时，提供可扩展的结构正确性检查。</p>\n<p>⚠️ 注意：排行榜高分不等于 agent 已经擅长多步任务；OpenReview 版本恰恰强调了从 function call 到 stateful agentic evaluation 仍有巨大落差。</div>",
      "quiz": {
        "q": "BFCL 为什么同时保留 AST evaluation 和 executable evaluation？",
        "options": [
          "因为 AST evaluation 更慢，需要 executable evaluation 加速",
          "因为并非所有场景都能统一真实执行，AST 能补足结构正确性检查",
          "因为 executable evaluation 只适用于多模态任务",
          "因为 AST evaluation 主要用于估计 token 成本"
        ],
        "answer": 1,
        "explain": "很多语言或接口难以统一真实执行，AST 检查能提供可扩展的结构验证，而可执行场景再用 execution 做更强约束。"
      }
    },
    {
      "id": "tau2_bench",
      "num": 15,
      "name": "τ²-Bench",
      "fullName": "双控对话代理基准 (τ²-Bench)",
      "year": "2025.06",
      "org": "Sierra/Princeton",
      "parent": "tau_bench",
      "paperUrl": "https://arxiv.org/abs/2506.07982",
      "projectUrl": "",
      "category": "evaluation",
      "motivation": "让用户与代理共同操控环境",
      "summary": "τ²-Bench 把对话 agent 从“只有 agent 能动手”的单控环境推进到“用户和 agent 都能通过工具改变同一世界状态”的双控环境，用 Dec-POMDP 建模、组合式任务生成器和受环境约束的用户模拟器，专门测 agent 的 reasoning 与 user guidance 能力。",
      "keyPoints": [
        "指出现有 conversational agent benchmark 多是假设只有 agent 操作工具，用户只是被动提供信息",
        "提出 Telecom dual-control domain：用户与 agent 都能对共享世界状态执行动作",
        "用 Dec-POMDP 建模双控交互，把协调与沟通问题显式化",
        "程序化组合任务生成器把 atomic components 组合成可验证任务，控制覆盖度与复杂度",
        "用户模拟器与环境状态、可用工具紧耦合，避免传统 user simulator 胡乱“配合”agent",
        "评测区分 reasoning error 与 communication/coordination error，而不是只看最终成败",
        "实验显示，从 no-user 场景切到 dual-control 后性能明显下降，说明“指导用户做正确动作”是独立难点"
      ],
      "detail": "<p><img alt=\"τ²-Bench 双控环境示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2506.07982/assets/x1.png\" />\n<em>图：τ²-Bench 把用户与 agent 都放进同一个可操作环境里，评测 agent 不仅要自己决策，还要指导用户采取正确动作。</em></p>\n<pre><code class=\"language-python\"># τ²-Bench 的双控交互循环（按论文方法概括）\ndef dual_control_episode(task, agent, user, env):\n    obs_agent, obs_user = env.reset(task)\n    while not env.done():\n        a_agent = agent.act(obs_agent)\n        a_user = user.act(obs_user)\n        state = env.step(a_agent, a_user)\n        obs_agent, obs_user = state.obs_for_agent, state.obs_for_user\n    return evaluate(task, state)\n</code></pre>\n<p>τ²-Bench 的关键洞察是：很多真实客服、支持和协同场景里，agent 并不能单方面完成所有操作。用户自己也会修改设备、输入参数、点击按钮、确认步骤，世界状态是“共同操控”的。过去大量 benchmark 仍然采用 single-control 假设，这会系统性高估 agent 的真实能力。</p>\n<p>因此论文把问题改写成 dual-control environment，并用 Dec-POMDP 建模。这样 agent 的任务不再只是“自己推理后采取动作”，还包括理解当前共享状态、判断哪些动作该自己做、哪些动作必须指导用户去做。</p>\n<p>为了让评测可控，τ²-Bench 还设计了 compositional task generator 与 tightly coupled user simulator。前者保证覆盖度和复杂度可控，后者避免模拟用户无条件帮 agent 补台阶。</p>\n<p>所以 τ²-Bench 代表的是评测范式的升级：它把对话 agent 从单方工具使用，推进到“共享环境中的协同控制”。</p>\n<div class=\"key-point\">💡 关键：dual-control 的难点不是多一个参与者，而是共享世界状态会让“自己做”和“指导别人做”成为两种不同决策。</p>\n<p>⚠️ 注意：如果 user simulator 不受环境约束，所谓双控评测会重新退化成单控 benchmark 的伪装版本。</div>",
      "quiz": {
        "q": "τ²-Bench 相比传统 single-control benchmark 的核心新增难点是什么？",
        "options": [
          "要求 agent 在没有任何工具的情况下纯聊天完成任务",
          "要求 agent 与用户共同操作共享环境，并正确协调谁该执行哪一步",
          "把所有任务都改成图像理解",
          "只允许 agent 在最后一轮调用工具"
        ],
        "answer": 1,
        "explain": "τ²-Bench 的新难点正是 dual-control：agent 不仅要自己操作，还要在共享状态下指导用户操作。"
      }
    },
    {
      "id": "vrrl_agents",
      "num": 16,
      "name": "EigenData+VR-RL",
      "fullName": "自演化数据与可验证奖励后训练 (EigenData + VR-RL)",
      "year": "2026.01",
      "org": "Tsinghua/Eigen AI",
      "parent": "toolace",
      "paperUrl": "https://arxiv.org/abs/2601.22607",
      "projectUrl": "",
      "category": "learning",
      "motivation": "自演化数据结合可验证奖励后训练",
      "summary": "提出 **EigenData**（自演化多智能体数据引擎）与 **Verifiable-Reward RL**（基于可验证奖励的GRPO强化学习）相结合的后训练框架，解决了长程工具使用场景下高质量训练数据匮乏和RL奖励信号不可靠的问题，在多域τ²-bench上使开源模型匹配甚至超越GPT-5/Claude等前沿闭源模型。",
      "keyPoints": [
        "<strong>EigenData 分层数据引擎</strong>：编排层（Orchestration Layer）含 WorkflowPlanner / PromptEngineer / Judge 三个Agent协同；执行层（Execution Layer）含七步流水线：RandomPool → UserIntent → TaskValidation → DialogSynthesis → TrajectoryValidation → Modify → ValidationFunction",
        "<strong>Per-Instance 可执行验证函数</strong>：每条合成的对话自动生成一个Python验证函数，解析最终状态与ground-truth状态对比，产生二值奖励信号，为RL提供无噪声的outcome reward",
        "<strong>自演化 Prompt 优化</strong>：每代迭代16次，使用5-20个样本，通过PromptEngineer和Judge自动改进prompt集合的质量和多样性",
        "<strong>三阶段大规模合成</strong>：多样化初始化 → 试优化（pilot optimization）→ 在线监控生成（online monitoring generation），逐步扩大数据规模和覆盖范围",
        "<strong>GRPO 轨迹级RL训练</strong>：基于 group-relative advantage 的 token-level clipping loss，配合 Dynamic Filtering 移除全成功/全失败的无信号组",
        "<strong>User Model 监督微调</strong>：先对开源用户模拟器进行SFT微调确保稳定模拟，避免用户模型错误污染RL奖励信号",
        "<strong>多域SOTA结果</strong>：Qwen3-235B-A22B RL后 Airline 73.0% / Retail 75.0% / Telecom 98.3%（passˆ1），匹配Gemini 3.0 Pro / Claude Sonnet 4.5",
        "<strong>Mix Training 泛化</strong>：三域混合训练单模型平均81.3% passˆ1，超越Qwen3-Max-Thinking (80.7%) 和 GPT-5 (80.0%)"
      ],
      "detail": "<h5>1. 框架总览</h5>\n<p>整体后训练流程分为两大阶段：</p>\n<p><strong>阶段一：EigenData 数据合成。</strong> 一个分层多智能体系统自动生成多轮工具使用对话及配套的per-instance验证函数。编排层的三个Agent分工协作：WorkflowPlanner 根据domain schema设计合成工作流，PromptEngineer 通过自演化迭代优化prompt，Judge 评估数据质量和任务多样性。执行层按照七步流水线将工作流实例化：从随机种子池中抽取用户画像（RandomPool），生成用户意图（UserIntent），验证任务可行性（TaskValidation），合成完整多轮对话（DialogSynthesis），对轨迹进行质量校验（TrajectoryValidation），按需修改或重试（Modify），最终生成可执行的验证函数（ValidationFunction）。关键特性是<strong>每条数据都带有独立的可执行验证函数</strong>，这为后续RL提供了精确的、无歧义的结果奖励信号。</p>\n<p><strong>阶段二：Verifiable-Reward RL 训练。</strong> 先用EigenData合成的大量对话对agent模型做SFT微调，同时对user simulator模型也做SFT微调（确保用户行为可靠）。然后在多轮交互环境中进行GRPO强化学习：agent与微调后的用户模拟器交互，生成的完整轨迹由per-instance验证函数评估产生outcome reward，通过group-relative advantage计算学习信号。</p>\n<p><img alt=\"EigenData 架构总览\" src=\"https://ar5iv.labs.arxiv.org/html/2601.22607/assets/x1.png\" />\n<em>图：EigenData 分层多智能体数据合成框架与 Verifiable-Reward RL 训练流程总览</em></p>\n<h5>2. EigenData 数据合成详解</h5>\n<p><strong>问题动机</strong>：传统工具使用数据依赖人工标注，成本极高且难以规模化。简单的模型生成数据缺乏多样性，且没有客观的验证手段来判断轨迹正确性。EigenData 的核心创新在于<strong>自动化生成可验证的数据</strong>，使得每条样本都自带\"标准答案检查器\"。</p>\n<p><strong>编排层（Orchestration Layer）</strong> 三个Agent的职责：</p>\n<ol>\n<li>\n<p><strong>WorkflowPlanner</strong>：接收domain的工具schema和任务描述，设计该领域的完整数据生成工作流，包括确定需要多少个不同的prompt集合（如Airline领域生成64个prompt set）、每个集合覆盖的用户场景类型、以及各步骤的具体配置参数。</p>\n</li>\n<li>\n<p><strong>PromptEngineer</strong>：负责prompt的自演化优化。采用迭代方式：从少量初始prompt开始（5-20个样本），生成一批对话数据，由Judge评估质量后，PromptEngineer分析失败案例并提出改进方向（如增加约束、调整话术、覆盖边缘情况），生成下一代prompt。每代迭代16次，prompt质量和生成的对话质量同步提升。</p>\n</li>\n<li>\n<p><strong>Judge</strong>：评估合成数据的质量，包括对话是否逻辑一致、工具调用是否正确、验证函数是否精确等。Judge的输出反馈给PromptEngineer形成闭环优化。</p>\n</li>\n</ol>\n<p><strong>执行层（Execution Layer）</strong> 七步流水线：</p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>步骤</th>\n<th>名称</th>\n<th>功能</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>RandomPool</td>\n<td>从预定义的种子池中随机采样用户画像、偏好、约束条件</td>\n</tr>\n<tr>\n<td>2</td>\n<td>UserIntent</td>\n<td>基于用户画像生成具体的任务意图（如\"预订从北京到上海的航班\"）</td>\n</tr>\n<tr>\n<td>3</td>\n<td>TaskValidation</td>\n<td>验证任务的可行性，确保工具schema能支持该任务</td>\n</tr>\n<tr>\n<td>4</td>\n<td>DialogSynthesis</td>\n<td>合成完整的多轮对话，agent逐步调用工具完成任务</td>\n</tr>\n<tr>\n<td>5</td>\n<td>TrajectoryValidation</td>\n<td>校验轨迹的正确性、连贯性和工具调用合理性</td>\n</tr>\n<tr>\n<td>6</td>\n<td>Modify</td>\n<td>对不通过的轨迹进行修改或重新生成</td>\n</tr>\n<tr>\n<td>7</td>\n<td>ValidationFunction</td>\n<td><strong>关键步骤</strong>：自动生成Python验证函数，该函数接收最终状态，与ground-truth比对</td>\n</tr>\n</tbody>\n</table></div>\n<p>验证函数的核心作用：</p>\n<pre><code class=\"language-python\"># 生成的验证函数示例（Telecom领域）\ndef validate(final_state, ground_truth):\n    &quot;&quot;&quot;比较关键实体和操作是否完全匹配&quot;&quot;&quot;\n    for entity in ground_truth[&quot;entities&quot;]:\n        if entity not in final_state[&quot;entities&quot;]:\n            return 0  # 失败\n    for action in ground_truth[&quot;actions&quot;]:\n        if action not in final_state[&quot;actions&quot;]:\n            return 0\n    return 1  # 完全匹配才成功\n</code></pre>\n<p>验证函数严格检查关键实体（entities）和行为（actions），只有<strong>完全匹配</strong>才评为成功，产生严格的二值奖励信号。</p>\n<p><strong>三阶段大规模合成策略</strong>：\n- <strong>Phase 1 - 多样化初始化</strong>：用RandomPool覆盖广泛的用户画像和任务类型，确保基础多样性\n- <strong>Phase 2 - 试优化</strong>：在小规模下运行自演化循环，快速迭代prompt到较优状态\n- <strong>Phase 3 - 在线监控生成</strong>：大规模生成的同时进行实时质量监控，过滤低质量数据</p>\n<p><strong>自演化效果验证</strong>：消融实验显示，移除自演化（w/o. Evolution）后Airline domain的passˆ1从56.0%降至44.0%，证明了自演化prompt优化的关键作用。移除验证Agent（w/o. Validation）降至50.0%，减少prompt set数量从64到4降至42.5%，说明数据质量和多样性同等重要。</p>\n<h5>3. Verifiable-Reward RL 训练方法</h5>\n<p><strong>为什么需要RL？</strong> SFT虽然能大幅提升基线性能（Telecom从27.1%→80.7%），但覆盖的分布受限于生成数据的分布。RL通过与环境交互的试错学习，使模型能够泛化到训练数据未覆盖的场景。</p>\n<p><strong>GRPO (Group Relative Policy Optimization) 训练流程</strong>：</p>\n<ol>\n<li>\n<p><strong>Rollout阶段</strong>：从prompt集合中采样batch个任务，每个任务用当前策略生成G条完整交互轨迹（G=8或16）。agent与user simulator交替交互，直至任务完成或达到最大轮次。</p>\n</li>\n<li>\n<p><strong>奖励计算</strong>：每条轨迹通过其专属验证函数评估，产生二值outcome reward <span class=\"kb-math kb-math-inline\">r \\in \\{0, 1\\}</span>。</p>\n</li>\n<li>\n<p><strong>优势计算</strong>：对每个任务组内的G条轨迹，计算 group-relative advantage：\n   <div class=\"kb-math kb-math-display\">\\hat{A}^{(g)}_t = \\frac{r^{(g)} - \\text{mean}(\\{r^{(1)}, ..., r^{(G)}\\})}{\\text{std}(\\{r^{(1)}, ..., r^{(G)}\\})}</div>\n   同一组内所有token position共享相同的优势值。</p>\n</li>\n<li>\n<p><strong>Clipping Loss</strong>：token-level的裁剪损失函数：\n   <div class=\"kb-math kb-math-display\">\\mathcal{L} = -\\mathbb{E}_t\\left[\\min\\left(\\frac{\\pi_\\theta}{\\pi_{\\theta_{\\text{old}}}} \\hat{A}_t, \\ \\text{clip}\\left(\\frac{\\pi_\\theta}{\\pi_{\\theta_{\\text{old}}}}, 1-\\epsilon, 1+\\epsilon\\right) \\hat{A}_t\\right)\\right]</div></p>\n</li>\n<li>\n<p><strong>Dynamic Filtering</strong>：在计算优势前，检查每个任务组：如果组内所有G条轨迹的奖励完全相同（全0或全1），则该组的优势全为0，不提供学习信号。将此类任务从当前batch中移除，保留有意义的差异化组。</p>\n</li>\n</ol>\n<p><strong>User Model 微调</strong>：这是论文的重要发现之一。在使用开源模型（如Qwen3-30B-A3B）直接作为用户模拟器时，模型经常无法正确遵循用户指令，错误地使用工具或忽略agent的响应，导致任务失败。由于奖励只看最终结果，agent的正确行为也会因用户错误而被错误惩罚（reward=0）。通过在EigenData合成数据上对user model进行SFT微调，使其能可靠地执行用户角色，从而保证RL训练信号的准确性。</p>\n<p><strong>User Model 消融实验</strong>：使用base user model时，Telecom domain RL训练后性能从85.4%降至75.6%（反而退化）；而使用微调后的user model则提升至95.6%。两者差距达20个百分点，充分说明user model质量对RL训练至关重要。</p>\n<p><strong>RL算法消融</strong>：\n- <strong>Batch Size</strong>：总batch size从256增至512带来显著提升（passˆ1: 64%→70.5%，passˆ4: 40%→52%），而相同总batch size下（256），prompt数×轨迹数（8×32 vs 16×16）差异很小（64% vs 66%），说明<strong>总batch size是主导因素</strong>。\n- <strong>Dynamic Filtering</strong>：开启后passˆ1从65.0%→70.5%，passˆ4从40.0%→52.0%，移除无信号组显著提升训练效率和最终性能。</p>\n<h5>4. 训练曲线与混合训练</h5>\n<p>论文在附录中展示了训练曲线。Separate training（单域训练）和Mix training（三域混合）均稳定收敛。Mix training在Qwen3-235B-A22B-2507上达到81.3%平均passˆ1，超越了Separate training的各域独立最优平均值。更重要的是，<strong>单模型</strong>在三个域上的passˆ4平均达68.5%，超越Qwen3-Max-Thinking (66.8%) 和 GPT-5 (64.0%)，证明混合训练具有正向的跨域泛化能力。</p>\n<h5>5. 关键设计洞察</h5>\n<div class=\"key-point\">💡 <strong>核心创新1：可验证奖励的自动化生成。</strong> EigenData不仅生成对话，更关键的是为每条对话生成一个可执行的Python验证函数。这解决了工具使用RL中长期存在的\"奖励信号从哪来\"的问题——不需要训练reward model，不需要人工标注，只需运行时执行验证函数即可获得精确的二值奖励。</p>\n<p>💡 <strong>核心创新2：User Model也需微调。</strong> 多轮交互RL训练中，用户模拟器的质量直接影响奖励信号的可靠性。一个\"笨\"用户会导致正确agent被错误惩罚，造成训练信号腐败。对user model做SFT是确保RL有效的前提。</p>\n<p>⚠️ <strong>局限与边界</strong>：验证函数要求\"完全匹配\"才能得奖励，这可能过于严格——部分正确的轨迹也被判失败，损失了细粒度的学习信号。同时，验证函数依赖于结构化状态表示，在开放式、无结构化的任务中难以自动生成精确的验证函数。</div>",
      "quiz": {
        "q": "EigenData数据合成流水线中，哪一步负责生成用于RL奖励信号的验证函数？",
        "options": [
          "DialogSynthesis - 对话合成阶段",
          "TrajectoryValidation - 轨迹验证阶段",
          "ValidationFunction - 验证函数生成阶段",
          "TaskValidation - 任务验证阶段"
        ],
        "answer": 2,
        "explain": "ValidationFunction是执行层七步流水线的最后一步，专门负责为每条合成对话生成可执行的Python验证函数，该函数比较最终状态与ground-truth以产生RL的outcome reward。"
      }
    },
    {
      "id": "intent",
      "num": 17,
      "name": "INTENT",
      "fullName": "意图感知预算规划 (INTENT)",
      "year": "2026.02",
      "org": "RUC/SUFE/Baidu",
      "parent": "llm_compiler",
      "paperUrl": "https://arxiv.org/abs/2602.11541",
      "projectUrl": "",
      "category": "orchestration",
      "motivation": "在预算约束下规划高成本工具调用",
      "summary": "INTENT 提出了一种面向高成本工具调用的推理时规划框架：它先用语言 world model 预演未来工具使用，再用“意图满足概率”对每一步成本做风险校准，从而在硬预算约束下显著提升 Agent 的任务成功率。",
      "keyPoints": [
        "形式化了 <strong>预算约束工具代理</strong>：每个任务由查询 <span class=\"kb-math kb-math-inline\">q</span>、预算 <span class=\"kb-math kb-math-inline\">B</span> 和动态工具市场快照 <span class=\"kb-math kb-math-inline\">\\mathcal{M}</span> 构成。",
        "训练 <strong>Language World Model</strong> 预测工具调用后的观测结构，用于轻量 lookahead，而不是昂贵的树搜索。",
        "提出 <strong>Monte Carlo Oracle (MCO)</strong>：通过单条前瞻 rollout 预估未来成本，超预算时拦截当前动作并返回失败轨迹。",
        "提出 <strong>INTENT</strong>：把 world model 分解成 <strong>意图预测器</strong> 与 <strong>条件生成器</strong>，显式估计工具结果是否满足当前推理意图。",
        "用 <strong>几何分布成本校准</strong> 把单步实际成本 <span class=\"kb-math kb-math-inline\">c</span> 修正为 <span class=\"kb-math kb-math-inline\">\\hat{c}=c/\\rho</span>，对低成功率工具进行风险惩罚。",
        "在 cost-augmented StableToolBench 上，相比 Raw / Prompt / DFSDT / BTP / BATS / MCO，INTENT 在两类 backbone 上都取得了最佳预算内性能。"
      ],
      "detail": "<p><img alt=\"INTENT 框架图\" src=\"https://ar5iv.labs.arxiv.org/html/2602.11541/assets/x1.png\" /></p>\n<p><em>图：预算约束下的三种推理时规划范式对比。INTENT 不做重型树搜索，而是用意图感知的单轨迹模拟与风险校准完成预算控制。</em></p>\n<h5>问题设定：Agent 面对的是“动态工具市场”</h5>\n<p>这篇论文要解决的不是普通的工具调用，而是 <strong>有预算上限的工具调用</strong>。每次请求都带着一个市场快照：</p>\n<pre><code class=\"language-python\">task_instance = {\n    &quot;query&quot;: q,\n    &quot;budget&quot;: B,\n    &quot;market&quot;: [(tool_1, cost_1), (tool_2, cost_2), ...]\n}\n</code></pre>\n<p>这里最关键的现实假设有两个：</p>\n<ul>\n<li><strong>工具有价格</strong>，每调用一次就要扣钱；</li>\n<li><strong>市场是动态的</strong>，工具是否可用、每次调用多少钱，都可能在不同任务里变化。</li>\n</ul>\n<p>这使得传统 offline 训练出来的固定策略不够用。模型在训练时见过的工具市场，和推理时遇到的市场不一定一致，所以作者选择做 <strong>inference-time planning</strong>，而不是再训一个重型后训练策略。</p>\n<h5>为什么不用 MCTS</h5>\n<p>论文先解释为什么标准在线规划算法不合适：</p>\n<ul>\n<li>工具参数是自然语言、代码或查询，<strong>动作空间几乎无限</strong>；</li>\n<li>LLM 每次推理都贵，<strong>没法像 MCTS 那样做大量模拟</strong>；</li>\n<li>文本历史不断增长，状态很难压缩复用。</li>\n</ul>\n<p>所以论文只保留“向前模拟”这个思想，但把它压缩成 <strong>单轨迹轻量 lookahead</strong>。</p>\n<h5>第一层：Language World Model</h5>\n<p>作者先训练一个语言 world model <span class=\"kb-math kb-math-inline\">\\mathcal{W}_{\\phi}</span>，输入工具调用与参数，预测工具返回的观测结构：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{o}_t \\sim \\mathcal{W}_{\\phi}(\\cdot \\mid [T_t, u_t]).</div>\n<p>重点不是让 world model 真的预测出精确事实值，而是预测：</p>\n<ul>\n<li>返回结果的结构；</li>\n<li>结果大致是否可用；</li>\n<li>这一步会不会把 Agent 带向成功还是失败循环。</li>\n</ul>\n<p>换句话说，INTENT 要的是 <strong>“能否看出这条计划会不会超预算”</strong>，而不是做一个完美的环境模拟器。</p>\n<h5>基线 Oracle：Monte Carlo Oracle (MCO)</h5>\n<p>MCO 的逻辑很直接。Agent 给出当前动作 <span class=\"kb-math kb-math-inline\">a_t</span> 后，Oracle 用 world model 和当前策略向前 rollout 到最终答案，得到一条模拟轨迹 <span class=\"kb-math kb-math-inline\">\\tilde{\\tau}</span>，并计算其总成本：</p>\n<div class=\"kb-math kb-math-display\">C(\\tilde{\\tau}) = \\sum_{\\tilde{a}\\in\\tilde{\\tau}} \\textsc{Cost}(\\tilde{a}).</div>\n<p>如果总成本不超过剩余预算，就放行；否则拦截当前动作，并把导致超预算的未来动作序列回传给 Agent 作为反馈。</p>\n<pre><code class=\"language-python\">def mco_decide(history, reasoning, action, budget):\n    rollout = simulate_future(history, reasoning, action)\n    projected_cost = sum(cost(a) for a in rollout)\n    if projected_cost &lt;= budget:\n        return &quot;accept&quot;, None\n    return &quot;reject&quot;, failure_trace(rollout)\n</code></pre>\n<p>这个设计已经很有用，但它有一个明显缺陷：<strong>只采一条未来轨迹，方差太大</strong>。如果模拟恰好抽到“幸运路径”，就会低估真实成本。</p>\n<h5>INTENT 的关键观察：真正决定 replanning 的是“是否满足意图”</h5>\n<p>INTENT 的核心思想是：Agent 后续是否会改变高层计划，不取决于工具返回内容的每个细节，而更取决于 <strong>当前结果是否满足了这一步的意图</strong>。</p>\n<p>比如搜索失败、返回无关结果、数据库查不到记录，Agent 往往会继续重试或改写参数。于是论文引入一个二值潜变量：</p>\n<div class=\"kb-math kb-math-display\">z_t \\in \\{0,1\\},</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">z_t=1</span> 表示“这次工具结果满足了当前推理意图”。</p>\n<p>于是观测生成被分解为：</p>\n<div class=\"kb-math kb-math-display\">P_{\\mathcal{W}}(o_t \\mid r_t, a_t)\n=\n\\sum_{z_t \\in \\{0,1\\}}\nP(o_t \\mid a_t, z_t)\\cdot P(z_t \\mid r_t, a_t).</div>\n<p>这对应两个子模块：</p>\n<ul>\n<li><strong>Intention Predictor</strong>：预测成功满足意图的概率 <span class=\"kb-math kb-math-inline\">\\rho_t</span>；</li>\n<li><strong>Conditional Generator</strong>：在给定 <span class=\"kb-math kb-math-inline\">z_t</span> 的条件下生成观测内容。</li>\n</ul>\n<h5>理想轨迹 + 悲观定价</h5>\n<p>INTENT 的妙处在于它不去显式采样失败分支，而是做：</p>\n<ul>\n<li><strong>乐观模拟</strong>：强制每一步都满足意图，生成一条“理想轨迹” <span class=\"kb-math kb-math-inline\">\\tilde{\\tau}^{*}</span>；</li>\n<li><strong>悲观定价</strong>：不用原始单次成本，而是把每一步成本按成功概率膨胀。</li>\n</ul>\n<p>如果某一步原始成本为 <span class=\"kb-math kb-math-inline\">c_k</span>，成功满足意图的概率为 <span class=\"kb-math kb-math-inline\">\\rho_k</span>，则其有效成本定义为：</p>\n<div class=\"kb-math kb-math-display\">\\tilde{c}_k = \\frac{c_k}{\\rho_k}.</div>\n<p>直觉很简单：如果一条工具调用一次成功的概率只有 0.25，那平均要试四次，真实期望成本就不该按一次算。</p>\n<p>最终接受规则是：</p>\n<div class=\"kb-math kb-math-display\">\\gamma \\sum_{\\tilde{a}_k \\in \\tilde{\\tau}^{*}} \\tilde{c}_k \\le B_t,</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">\\gamma</span> 是风险偏好系数：</p>\n<ul>\n<li><span class=\"kb-math kb-math-inline\">\\gamma \\ge 1</span>：更保守；</li>\n<li><span class=\"kb-math kb-math-inline\">\\gamma &lt; 1</span>：更激进。</li>\n</ul>\n<div class=\"key-point\">💡 关键：INTENT 不是直接“搜索最便宜路线”，而是先抽出 Agent 眼中的潜在计划，再用成功概率给这条计划重新定价。</div>\n<h5>完整流程</h5>\n<pre><code class=\"language-python\">def intent_oracle(history, reasoning, action, budget):\n    ideal_traj = simulate_with_forced_success(history, reasoning, action)\n    effective_cost = 0.0\n    for step in ideal_traj:\n        rho = intention_predictor(step.reasoning, step.tool, step.args)\n        effective_cost += raw_cost(step.action) / rho\n    if raw_cost(action) &lt;= budget and gamma * effective_cost &lt;= budget:\n        return &quot;accept&quot;, None\n    return &quot;reject&quot;, annotated_failure_trace(ideal_traj)\n</code></pre>\n<p>论文还加入了 <strong>simulation reuse</strong>：如果下一步真实动作和上一步缓存的理想轨迹对齐，就直接复用已有模拟，减少额外开销。</p>\n<h5>实验结果</h5>\n<p>INTENT 在 cost-augmented StableToolBench 上，与多类基线比较：</p>\n<ul>\n<li><strong>Soft baselines</strong>：Raw、Prompt</li>\n<li><strong>Enforce baselines</strong>：DFSDT、BTP、BATS、MCO</li>\n</ul>\n<p>在 <strong>Non-Reasoning backbone（GPT-4.1 mini）</strong> 上：</p>\n<ul>\n<li>INTENT 的 PR 为 <strong>63.8</strong></li>\n<li>高于 MCO 的 <strong>58.9</strong></li>\n<li>且 FR 为 <strong>100.0</strong>，实现严格预算可行</li>\n</ul>\n<p>在 <strong>Reasoning backbone（GPT-5 nano）</strong> 上：</p>\n<ul>\n<li>INTENT 的 PR 为 <strong>76.0</strong></li>\n<li>高于 MCO 的 <strong>71.4</strong></li>\n<li>WR、OR 也都是全表最佳</li>\n</ul>\n<p>论文还展示了它对 <strong>价格变化、预算变化、新工具引入</strong> 的鲁棒性，说明这种 world-model + oracle 的做法比把预算约束硬塞进 prompt 更稳定。</p>\n<h5>这篇工作的意义</h5>\n<p>INTENT 的代表性不在于又提出了一个新 Agent prompt，而在于它把预算控制从“口头要求节省调用”推进成了一个真正的推理时控制机制：</p>\n<ul>\n<li>先预测未来；</li>\n<li>再估算风险；</li>\n<li>再决定是否拦截当前动作。</li>\n</ul>\n<p>这条路线很适合高成本工具市场，比如付费搜索、企业内部 API、昂贵代码执行或多服务编排。</p>\n<div class=\"warn-box\">⚠️ 注意：INTENT 依赖于 world model 和意图预测器的质量。如果这两个模块严重偏差，Oracle 也会系统性误判预算风险。</div>",
      "quiz": {
        "q": "INTENT 中把单步工具成本从 c 修正为 c/ρ 的直接目的是什么？",
        "options": [
          "把所有工具价格统一到同一个常数",
          "根据意图满足概率估计重试开销，对高风险调用做悲观定价",
          "让 world model 不再需要生成观测",
          "把多步轨迹压缩成一步"
        ],
        "answer": 1,
        "explain": "ρ 表示该工具结果满足当前意图的概率。若 ρ 很低，模型往往需要多次重试，因此 INTENT 用 c/ρ 估计更真实的期望成本。"
      }
    },
    {
      "id": "cm2",
      "num": 18,
      "name": "CM2",
      "fullName": "清单奖励工具代理强化学习 (CM2)",
      "year": "2026.02",
      "org": "UC Santa Barbara",
      "parent": "vrrl_agents",
      "paperUrl": "https://arxiv.org/abs/2602.12268",
      "projectUrl": "",
      "category": "learning",
      "motivation": "用清单奖励替代难构造验证器",
      "summary": "CM2 用**细粒度二值清单（checklist）作为奖励信号**替代传统RL中难以构造的验证器（verifier），在LLM模拟的工具环境中训练多轮多步Agent，在 τ-Bench、BFCL-V4、ToolSandbox 上分别提升 8/10/12 分，为\"无真值奖励下的Agent RL\"提供了可复制的工程配方。",
      "keyPoints": [
        "<strong>问题动机</strong>：多轮工具使用Agent的真实目标（如客服满意度、代码调试正确性）往往缺乏可自动计算的 verifiable reward，而人工验证代价高昂，限制了 RL 的规模化应用。",
        "<strong>核心方法——Checklist Reward</strong>：将每一轮Agent的期望行为<strong>分解为一组细粒度二值判断准则</strong>，每条准则明确要求\"证据锚定（evidence grounding）\"和结构化元数据，将开放式评价转化为稳定的分类决策。",
        "<strong>稀疏奖励 + 稠密评价</strong>：奖励分配稀疏（关键节点才给奖励），但评价准则覆盖稠密（每轮都有清单），在\"信号稳定性\"与\"信息量\"之间取得平衡。",
        "<strong>LLM模拟工具环境</strong>：训练不需要真实工具执行，而是用LLM扮演工具和用户，大幅降低工程开销，支持大规模、多工具覆盖的训练。",
        "<strong>实验效果显著</strong>：从8B Base模型出发，在8k条RL数据上训练后，CM2在 τ-Bench (+8分)、BFCL-V4 (+10分)、ToolSandbox (+12分) 三个多轮工具使用基准上全面超越SFT基线，匹配甚至超越同规模开源 baseline（包括 judging model）。"
      ],
      "detail": "<p><img alt=\"CM2 示意图\" src=\"https://ar5iv.labs.arxiv.org/html/2602.12268/assets/x1.png\" />\n<em>图：CM2 的核心框架或评测示意。</em></p>\n<h5>整体架构</h5>\n<pre><code class=\"language-mermaid\">flowchart TB\n    U[&quot;👤 用户/任务&quot;] --&gt; A[&quot;🤖 Agent LLM&lt;br/&gt;(策略网络 π)&quot;]\n    A --&gt;|&quot;动作 a_t&quot;| E[&quot;🔧 工具环境&lt;br/&gt;(LLM-Simulated)&quot;]\n    E --&gt;|&quot;观察 o_t&quot;| A\n    A --&gt;|&quot;完整轨迹 τ&quot;| J[&quot;📋 Checklist Judger&quot;]\n    J --&gt;|&quot;清单评分 R_c&quot;| T[&quot;📊 RL Trainer&lt;br/&gt;(GRPO/PPO)&quot;]\n    T --&gt;|&quot;梯度更新&quot;| A\n\n    subgraph Checklist[&quot;清单奖励结构&quot;]\n        C1[&quot;Criterion-1: 正确调用工具 ✅/❌&quot;]\n        C2[&quot;Criterion-2: 参数完整有效 ✅/❌&quot;]\n        C3[&quot;Criterion-3: 理解工具输出 ✅/❌&quot;]\n        C4[&quot;Criterion-4: 回复用户恰当 ✅/❌&quot;]\n        C5[&quot;Criterion-N: ... ✅/❌&quot;]\n    end\n\n    J --&gt; Checklist\n</code></pre>\n<h5>核心算法：Checklist Reward 计算</h5>\n<pre><code>算法：CM2 训练流程（一轮交互）\n\n输入：Agent策略 π_θ，任务集 D，清单模板库 C，LLM模拟环境 E\n输出：优化后的策略 π_θ\n\nfor each episode (user_task) in D:\n    τ ← []                    # 轨迹\n    for turn t = 1 .. T:\n        a_t ← π_θ(o_t)        # Agent 产生动作（工具调用/回复）\n        o_{t+1} ← E(a_t)      # 模拟环境返回观察\n        τ.append((o_t, a_t, o_{t+1}))\n\n    # === 对每轮生成清单并打分 ===\n    checklist_scores ← []\n    for turn t = 1 .. T:\n        criteria ← GenerateChecklist(\n            task=user_task,\n            turn_context=τ[:t],\n            template=C\n        )\n        # 每条准则有：描述、证据锚点、期望行为\n        for each criterion in criteria:\n            verdict ← LLM_Judge(\n                criterion=criterion,\n                evidence=τ[t],\n                output_format=&quot;BINARY ❌/✅&quot;\n            )\n        turn_score ← fraction of ✅ verdicts\n        checklist_scores.append(turn_score)\n\n    # === 稀疏奖励聚合 ===\n    # 只在回合结束时给最终奖励（稀疏）\n    R_final ← Aggregate(checklist_scores)  # 如：平均或加权和\n\n    # === 策略优化 ===\n    π_θ ← RL_Update(π_θ, τ, R_final)  # 使用 GRPO/PPO\n</code></pre>\n<h5>深入解读</h5>\n<p><strong>（一）为什么 Checklist 能替代 Verifier？</strong></p>\n<p>传统 RL 依赖可自动验证的奖励函数（如数学题的答案对错、代码的 pass/fail）。但真实Agent任务（如\"帮用户预订合适的酒店\"或\"排查一个故障\"）的成功标准是<strong>多维、开放且主观的</strong>。CM2 的洞察在于：虽然整体判断困难，但<strong>可以分解为大量小尺度、有明确锚点的二值提问</strong>。例如判断\"Agent是否提取了用户提过的日期\"远比判断\"整个对话是否令人满意\"容易且稳定。这种分解将主观评价转化为客观分类，使奖励信号可用且可复现。</p>\n<p><strong>（二）稀疏奖励 + 稠密评价的设计哲学</strong></p>\n<p>CM2 采用\"评价稠密、奖励稀疏\"的策略：<strong>每轮都生成完整清单并逐条打分，但只在关键节点（如回合结束）给一个聚合奖励</strong>。这避免了RL训练中常见的两个陷阱——过于稀疏导致学习困难，过于稠密导致reward hacking。清单中的每条criterion都要求\"证据锚定（evidence grounding）\"，即必须引用轨迹中的具体文本或工具输出来支撑判断，防止LLM法官随意发挥。这种设计使评判的稳定性显著提升。</p>\n<p><strong>（三）LLM-Simulated 工具环境的工程价值</strong></p>\n<p>真实工具环境（如实际调用搜索引擎、数据库、API）的搭建与维护成本极高，且容易因外部变化导致复现困难。CM2 用 LLM 模拟工具执行，将工具的语义输入输出作为训练信号而非真实执行结果。这样做的额外好处是：可以<strong>大规模覆盖长尾工具</strong>（训练中可引入数百种工具），且环境完全可控、可复现。实验证明，这种模拟环境训练的Agent在真实工具上的泛化能力依然出色。</p>\n<p><strong>（四）实验结果的关键信号</strong></p>\n<p>从 8B Base 模型（未经指令微调）出发，仅用8k条RL训练示例，就实现了：\n- τ-Bench: SFT + 8pts，超越同规模开源模型\n- BFCL-V4: SFT + 10pts\n- ToolSandbox: SFT + 12pts\n- <strong>甚至超越judging model本身</strong>——说明checklist reward的信号质量足够好，能引导模型超越\"评判者的水平\"</p>\n<p>这证明了 checklist-based RL 是一条可行且高效的Agent优化路径，特别适合\"有标准期望行为但无简单真值\"的场景。</p>",
      "quiz": {
        "q": "CM2 为什么不用单一端到端对话评分，而要把奖励拆成 checklist？",
        "options": [
          "因为 checklist 可以完全替代策略模型",
          "因为多轮工具任务缺少稳定真值，拆成证据锚定的细粒度判断更容易形成可复用奖励信号",
          "因为 checklist 只适用于单轮任务",
          "因为这样就不再需要 RL 优化"
        ],
        "answer": 1,
        "explain": "CM2 的关键就在于把主观、开放的任务质量拆成可判断的小项，用二值 checklist 取代难以设计的 verifier。"
      }
    },
    {
      "id": "asyncfc",
      "num": 19,
      "name": "AsyncFC",
      "fullName": "异步函数调用框架 (AsyncFC)",
      "year": "2026.05",
      "org": "UC Berkeley",
      "parent": "llm_compiler",
      "paperUrl": "https://arxiv.org/abs/2605.15077",
      "projectUrl": "",
      "category": "orchestration",
      "motivation": "不改模型实现未来值驱动异步调用",
      "summary": "AsyncFC 利用 **futures（引用标记）** 和基于特殊 token 的**依赖标注**机制，使 Agent 大模型能在函数调用尚未返回时继续解码和发射新调用，实现函数执行的异步并行化；在 BFCL v3/v4、SWE-bench Lite、HotpotQA 等基准上保持准确率不变，端到端延迟降低 1.12–1.44 倍。",
      "keyPoints": [
        "提出 <strong>futures</strong> 机制：模型生成的函数调用不等待返回，而是立即获得一个引用标记（future），继续后续解码",
        "设计 <strong>依赖标注语法</strong> <code>&lt;function=dep_id&gt;</code>：模型通过标注显式声明调用间的依赖关系，调度器据此决定并行策略",
        "提出 <strong>No Stall Policy</strong>：当模型需要等待某 future 就绪时，调度器允许它转而生成新的函数调用或\"不依赖未就绪结果\"的响应，避免解码空转",
        "构建 <strong>Call Decoder + Response Decoder + Scheduler</strong> 三组件架构：Call Decoder 生成调用与依赖标注，Response Decoder 在 future 就绪后组装最终响应，Scheduler 负责并行调度与状态管理",
        "在 BFCL v3 (1.26×)、BFCL v4 (1.12×)、SWE-bench Lite (1.44×)、HotpotQA (1.24×) 上准确率零损失加速",
        "跨模型验证（GPT-4o、Gemini 2.5 Pro、GPT-5.2）均有效，证明方法的模型无关性",
        "推导了理论加速上界公式 <span class=\"kb-math kb-math-inline\">R = \\frac{T_{\\text{LLM}} + T_{\\text{tool}}}{\\max(T_{\\text{LLM}}, T_{\\text{cp}})}</span>，揭示加速取决于 DAG 并行度与解码-执行重叠度"
      ],
      "detail": "<h5>核心示意图</h5>\n<p><img alt=\"AsyncFC 架构图\" src=\"https://ar5iv.labs.arxiv.org/html/2605.15077/assets/Schedueler_Architecture.png\" />\n<em>图：AsyncFC 三组件架构——Call Decoder 生成调用及依赖标注，Scheduler 异步分派并管理 future 状态，Response Decoder 在依赖就绪后组装最终响应</em></p>\n<p><img alt=\"函数调用时间线对比\" src=\"https://ar5iv.labs.arxiv.org/html/2605.15077/assets/FC_Timeline.png\" />\n<em>图：同步 vs 异步函数调用时间线。同步模式下解码器必须等待每次函数调用返回；AsyncFC 中模型持续解码，多个调用并行执行</em></p>\n<p><img alt=\"端到端加速效果\" src=\"https://ar5iv.labs.arxiv.org/html/2605.15077/assets/demo_timeline_comparison_horizontal.png\" />\n<em>图：真实工作负载下的时间线对比——AsyncFC 大幅缩短端到端延迟</em></p>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># AsyncFC 核心调度循环\ndef asyncfc_scheduler(task, model):\n    futures = {}          # dep_id → future 映射\n    pending_calls = {}    # dep_id → call_info\n    output_buffer = []    # 已完成的响应片段\n\n    while not task_complete:\n        # 阶段1: Call Decoder 生成调用 + 依赖标注\n        raw_output = model.decode(\n            context=task.context,\n            pending_futures=futures,  # 模型可看到未就绪的 future\n            no_stall=True             # 允许跳过等待\n        )\n\n        calls = parse_function_calls(raw_output)\n        # 例: &lt;function=dep_1&gt;search(&quot;async programming&quot;)\n        #     &lt;function=dep_2|dep_1&gt;summarize(dep_1.result)\n\n        # 阶段2: 提取依赖关系并发射调用\n        for call in calls:\n            dep_id = call.dep_id            # 当前调用的 ID\n            deps = call.dependencies         # 依赖的前驱 dep_id 列表\n\n            if all_ready(deps, futures):\n                future = executor.submit(call.func, call.args)\n                futures[dep_id] = future\n            else:\n                pending_calls[dep_id] = call  # 暂存，等待依赖就绪\n\n        # 阶段3: 检查 future 就绪情况\n        for dep_id, future in list(futures.items()):\n            if future.done():\n                result = future.result()\n                output_buffer.append((dep_id, result))\n                # 唤醒依赖该 future 的暂存调用\n                for pending_id, pending_call in list(pending_calls.items()):\n                    if all_ready(pending_call.dependencies, futures):\n                        f = executor.submit(pending_call.func, pending_call.args)\n                        futures[pending_id] = f\n                        del pending_calls[pending_id]\n\n        # 阶段4: Response Decoder 组装最终输出\n        if task_complete:\n            final_response = response_decoder(output_buffer)\n            break\n\n    return final_response\n</code></pre>\n<h5>深入解释</h5>\n<p><strong>1. 动机与背景：Agent 函数调用的\"同步困局\"</strong></p>\n<p>传统 Agent LLM 采用严格的<strong>同步函数调用范式</strong>：模型生成一个函数调用 → 暂停解码 → 等待函数执行返回 → 将结果拼入上下文 → 继续解码。这种模式的根本问题在于：\n- 函数执行期间 GPU 闲置，浪费计算资源\n- 多个独立函数调用必须串行执行，无法利用并行性\n- 端到端延迟 = 解码时间总和 + 函数执行时间总和，无重叠</p>\n<p>AsyncFC 的关键洞察是：<strong>函数调用之间往往存在天然并行性</strong>（如同时搜索多个关键词、并行读取多个文件），且<strong>模型不需要所有调用结果就能继续部分解码</strong>（如开始规划下一步、输出不依赖未就绪结果的文本）。通过引入 futures 概念和依赖标注，AsyncFC 将函数调用的控制流从\"同步等待\"转变为\"异步流水线\"。</p>\n<p><strong>2. 核心机制：Futures + 依赖标注</strong></p>\n<p>AsyncFC 的核心创新在于两方面的协同设计：</p>\n<p><strong>(a) Futures 机制</strong>：模型生成函数调用时，系统立即返回一个 future 引用标记——一个不透明的引用，代表\"尚未就绪但已提交执行的结果\"。模型可以继续解码而无需等待。当模型引用 future 时（如 <code>dep_1.result</code>），若 future 已就绪则直接取值，否则触发 No Stall Policy。</p>\n<p><strong>(b) 依赖标注语法</strong>：AsyncFC 不使用复杂的 prompt 工程，而是通过特殊 token <code>&lt;function=dep_id|deps&gt;</code> 在函数调用文本中嵌入结构化的依赖信息：\n- <code>&lt;function=dep_1&gt;</code>：声明一个不依赖前驱的独立调用\n- <code>&lt;function=dep_3|dep_1,dep_2&gt;</code>：声明 dep_3 依赖 dep_1 和 dep_2 的结果</p>\n<p>这种设计的精妙之处在于：依赖标注完全<strong>嵌入在模型原生输出格式中</strong>，无需额外解析层；模型通过微调（fine-tuning）学习何时标注依赖，无需手工规则。</p>\n<div class=\"key-point\">💡 <strong>关键设计决策</strong>：AsyncFC 选择让模型显式标注依赖关系，而非由调度器推断。原因是模型天然理解任务语义（\"先搜索再总结\"），能比静态分析更准确地识别因果依赖。微调时，轨迹中的并行调用组被自动标注为相同时间步，模型从中学习并行性模式。</div>\n<p><strong>3. No Stall Policy：解码不等待的关键</strong></p>\n<p>当模型尝试引用一个未就绪的 future 时，传统的做法是阻塞等待。AsyncFC 的 <strong>No Stall Policy</strong> 提供了两种选择：\n- <strong>发射新调用</strong>：如果模型可生成新的独立函数调用（不依赖未就绪结果），调度器允许它继续发射，增加并行度\n- <strong>生成不依赖响应</strong>：如果模型可输出不涉及未就绪结果的文本（如\"正在执行搜索，同时我先整理已有信息…\"），则直接生成</p>\n<p>这一策略的理论基础来自加速上界分析：</p>\n<div class=\"kb-math kb-math-display\">R = \\frac{T_{\\text{LLM}} + T_{\\text{tool}}}{\\max(T_{\\text{LLM}}, T_{\\text{cp}})}</div>\n<p>其中 <span class=\"kb-math kb-math-inline\">T_{\\text{LLM}}</span> 是总解码时间，<span class=\"kb-math kb-math-inline\">T_{\\text{tool}}</span> 是所有函数执行时间之和，<span class=\"kb-math kb-math-inline\">T_{\\text{cp}}</span> 是 DAG 关键路径上的函数执行时间。当存在充分并行性（<span class=\"kb-math kb-math-inline\">T_{\\text{tool}} \\gg T_{\\text{cp}}</span>）且解码时间与关键路径接近（<span class=\"kb-math kb-math-inline\">T_{\\text{LLM}} \\approx T_{\\text{cp}}</span>）时，加速达到<strong>甜点区</strong>。</p>\n<div class=\"warn-box\">⚠️ <strong>注意</strong>：引入解码开销 <span class=\"kb-math kb-math-inline\">\\alpha</span> 后，加速比修正为分段函数——当关键路径长时，加速受限于 <span class=\"kb-math kb-math-inline\">T_{\\text{cp}}</span>；当关键路径短时，加速受限于解码开销。更深/更长延迟的 DAG 从更大模型（更大 <span class=\"kb-math kb-math-inline\">T_{\\text{LLM}}</span>）中获益更多，浅 DAG 则相反。</div>\n<p><strong>4. 三组件架构的协同运作</strong></p>\n<p>AsyncFC 的架构由三个解耦组件构成：</p>\n<ul>\n<li>\n<p><strong>Call Decoder</strong>：负责在任务上下文中生成函数调用及其依赖标注。在微调阶段，训练数据中的同步调用序列被转换为带时间步标注的并行组，模型学习识别可并行的调用并标注依赖。</p>\n</li>\n<li>\n<p><strong>Scheduler</strong>：管理 future 生命周期——提交调用、追踪就绪状态、在依赖满足时自动唤醒后继调用。Scheduler 维护一个依赖图，当 future 就绪时，检查所有被阻塞的调用是否可执行。</p>\n</li>\n<li>\n<p><strong>Response Decoder</strong>：在所有必要调用完成后，将 future 结果按依赖顺序组装为最终用户响应。它确保输出的一致性和正确顺序，即使底层调用是乱序完成的。</p>\n</li>\n</ul>\n<p>这三个组件的设计使 AsyncFC 对模型的推理过程<strong>透明</strong>——模型看到的是与同步模式几乎相同的接口（只是多了 futures 和依赖标注），现有 LLM 只需微调即可适配。</p>\n<p><strong>5. 与传统方法的区别</strong></p>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>同步 Function Calling</th>\n<th>并行 Tool Use（如现有 GPT）</th>\n<th>AsyncFC</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>解码-执行</td>\n<td>严格串行</td>\n<td>批量发射但等待全部返回</td>\n<td>异步流水线，持续解码</td>\n</tr>\n<tr>\n<td>依赖处理</td>\n<td>隐式（顺序即依赖）</td>\n<td>无显式依赖</td>\n<td>模型显式标注 dep_id</td>\n</tr>\n<tr>\n<td>加速来源</td>\n<td>无</td>\n<td>独立调用间并行</td>\n<td>独立调用并行 + 解码重叠</td>\n</tr>\n<tr>\n<td>模型改动</td>\n<td>无</td>\n<td>微小 prompt 调整</td>\n<td>微调学习依赖标注</td>\n</tr>\n</tbody>\n</table></div>\n<p>现有 GPT-4o 等模型的\"并行 tool use\"允许在一个 turn 中同时发射多个独立调用，但<strong>必须等待所有调用返回才能继续解码</strong>。AsyncFC 打破了这一限制——解码与函数执行可重叠，模型在等待 slow 函数时可以继续发射 fast 函数或生成文本。</p>\n<p><strong>6. 实验关键发现</strong></p>\n<ul>\n<li><strong>BFCL v3/sc-multi-turn（1.26×）</strong>：多轮场景中函数调用链长、依赖复杂，AsyncFC 的并行化 + 解码重叠双重机制带来最大收益</li>\n<li><strong>BFCL v4/live-single-turn（1.12×）</strong>：单轮场景中并行度有限，但 No Stall Policy 的解码重叠仍带来加速</li>\n<li><strong>SWE-bench Lite（1.44×）</strong>：代码修复任务涉及大量文件读取，天然高并行度（并行读取多个文件），加速最显著</li>\n<li><strong>HotpotQA（1.24×）</strong>：多跳问答中的并行搜索符合 DAG 并行性假设</li>\n<li>消融实验证实：(i) 仅并行执行无 No Stall 收益有限；(ii) 仅 No Stall 无依赖标注导致错误率上升；(iii) 两者结合才达到准确率零损失加速</li>\n</ul>",
      "quiz": {
        "q": "AsyncFC 中 No Stall Policy 的核心作用是什么？",
        "options": [
          "减少模型解码时的 token 消耗",
          "允许模型在等待函数返回时继续解码或发射新调用，避免 GPU 空转",
          "通过剪枝降低函数调用 DAG 的深度",
          "自动将同步函数调用改写为异步调用"
        ],
        "answer": 1,
        "explain": "No Stall Policy 允许 decode 不等待未就绪的 future，转而生成新调用或不依赖未就绪结果的文本，是实现解码-执行时间重叠的关键机制。"
      }
    },
    {
      "id": "apb",
      "num": 20,
      "name": "APB",
      "fullName": "Agent规划基准 (Agent Planning Benchmark)",
      "year": "2026.06",
      "org": "Tongji University",
      "parent": "tau2_bench",
      "paperUrl": "https://arxiv.org/abs/2606.04874",
      "projectUrl": "",
      "category": "evaluation",
      "motivation": "把规划能力从执行结果中单独诊断",
      "summary": "APB 提出首个面向 LLM Agent **规划能力**的诊断性基准，通过 4209 个多模态样本覆盖 22 个领域和 5 种测试设置，将规划与执行解耦，系统性地暴露了 12 个 MLLM 在长周期规划、工具噪声鲁棒性和校准拒绝方面的系统性缺陷，并验证了 APB 引导的精炼可一致提升下游执行指标。",
      "keyPoints": [
        "<strong>规划-执行解耦诊断</strong>：首次将 Agent 失败根因拆分为\"规划错误\"与\"执行错误\"，通过纯规划评测精确定位瓶颈",
        "<strong>4209 多模态样本 × 22 领域</strong>：覆盖工具使用、任务分解、约束推理等广泛场景，远超现有基准的领域广度",
        "<strong>5 种互补评测设置</strong>：",
        "Holistic Planning（整体规划）：端到端生成完整计划",
        "Feedback-conditioned Step-wise Planning（反馈条件逐步规划）：基于环境反馈逐步调整",
        "Extraneous Tools Robustness（冗余工具鲁棒性）：在干扰工具存在时保持规划质量",
        "Broken Tools Robustness（损坏工具鲁棒性）：部分工具不可用时的容错能力",
        "Unsolvable Tasks（不可解任务）：识别并正确拒绝无法完成的任务",
        "<strong>12 个 MLLM 全面评测</strong>：揭示长周期规划衰退、工具噪声敏感、过度执行倾向（不会拒绝）等共性弱点",
        "<strong>下游验证闭环</strong>：在 200 ToolSandbox + 200 τ²-bench 任务上验证 APB 引导的精炼可提升 plan correctness、plan grade 和执行成功率",
        "<strong>推理时精炼（Inference-time Refinement）</strong>：发现模型在原位自我修正能力不足，需借助 APB 诊断信号进行针对性改进"
      ],
      "detail": "<h5>核心框架图</h5>\n<p><img alt=\"APB 框架总览\" src=\"https://ar5iv.labs.arxiv.org/html/2606.04874/assets/x1.png\" />\n<em>图：APB 诊断框架的总体架构——从任务定义、规划生成到多维诊断的闭环流程（来源：论文 Figure 1）</em></p>\n<div class=\"warn-box\">⚠️ 注意：由于论文全文获取限制，上图为基于论文描述的示意链接。实际框架包含三个核心模块：<strong>规划生成器</strong>（接收任务描述与工具清单）、<strong>诊断器</strong>（对规划进行多维评分）、<strong>精炼器</strong>（基于诊断信号迭代优化）。详细的架构图请参阅论文原文 Figure 1 及 Appendix。</div>\n<h5>算法伪代码</h5>\n<pre><code class=\"language-python\"># APB 诊断流程伪代码（基于论文 Method 部分还原）\ndef apb_diagnose(task, tools, model, settings):\n    &quot;&quot;&quot;\n    settings ∈ {holistic, feedback_stepwise, extraneous, broken, unsolvable}\n    &quot;&quot;&quot;\n    # 1. 规划生成\n    if settings == &quot;holistic&quot;:\n        plan = model.generate_plan(task, tools)  # 一次性生成完整计划\n    elif settings == &quot;feedback_stepwise&quot;:\n        plan = []\n        for step in range(max_steps):\n            obs = env.execute(plan[-1]) if plan else task\n            next_action = model.step(task, tools, obs)\n            plan.append(next_action)\n    elif settings == &quot;extraneous&quot;:\n        noisy_tools = tools + random_distractors(k=5)  # 注入冗余工具\n        plan = model.generate_plan(task, noisy_tools)\n    elif settings == &quot;broken&quot;:\n        broken_tools = mark_broken(tools, ratio=0.3)  # 随机标记30%工具不可用\n        plan = model.generate_plan(task, broken_tools)\n    elif settings == &quot;unsolvable&quot;:\n        plan = model.generate_plan(unsolvable_task, tools)  # 期望输出REFUSE\n\n    # 2. 多维诊断评分\n    scores = {\n        &quot;correctness&quot;: eval_correctness(plan, ground_truth),     # 计划正确性\n        &quot;completeness&quot;: eval_completeness(plan, required_steps), # 步骤完整性\n        &quot;tool_accuracy&quot;: eval_tool_selection(plan, tools),       # 工具选择准确率\n        &quot;refusal_calibration&quot;: eval_refusal(plan, task.solvable),# 拒绝校准度\n        &quot;noise_robustness&quot;: eval_noise_resistance(plan, settings),# 噪声鲁棒性\n    }\n    return plan, scores\n\n# 3. APB 引导的精炼（用于下游任务）\ndef apb_guided_refinement(base_plan, apb_scores):\n    refinement_prompt = f&quot;&quot;&quot;\n    Your plan scored: {apb_scores}\n    Weaknesses detected: {analyze_weaknesses(apb_scores)}\n    Please revise the plan to address these issues.\n    &quot;&quot;&quot;\n    refined_plan = model.refine(base_plan, refinement_prompt)\n    return refined_plan\n</code></pre>\n<p><em>伪代码说明：APB 的核心在于通过 5 种设置生成规划并对其进行</em><em>多维诊断</em><em>，而非仅给出二元成功/失败标签。这种细粒度信号使得后续的精炼和模型改进有了明确的优化方向。</em></p>\n<h5>动机与背景：为何需要规划专用基准？</h5>\n<p>LLM Agent 社区长期面临一个根本问题：<strong>Agent 失败了，但我们不知道是\"想错了\"还是\"做错了\"</strong>。现有基准（如 WebArena、ToolSandbox）几乎无一例外地报告端到端任务成功率，将规划能力与工具执行能力混为一谈。这种混淆导致：(1) 模型开发者在优化时缺乏明确方向——究竟是提升推理能力还是加强工具调用？(2) 看似成功率相近的模型，可能有着截然不同的能力剖面（一个长于规划但拙于执行，另一个反之）。APB 的核心动机正是<strong>将规划从执行的阴影中解放出来</strong>，单独、系统地进行诊断。</p>\n<h5>核心机制：五维诊断体系</h5>\n<p>APB 的五种评测设置并非简单并列，而是构成了一个<strong>能力剖面矩阵</strong>：</p>\n<ol>\n<li>\n<p><strong>Holistic Planning</strong>：测评模型在无环境反馈时\"一口气\"生成完整计划的能力。这是最基础的规划能力，考察的是模型对任务结构的内化理解。研究发现，随着任务步骤数增加（从 3 步到 10+ 步），所有模型的 plan correctness 呈<strong>非线性快速衰减</strong>，暴露了长周期规划的根本性困难。</p>\n</li>\n<li>\n<p><strong>Feedback-conditioned Step-wise Planning</strong>：引入环境反馈后的逐步规划。这一设置模拟了 ReAct-style Agent 的真实工作方式。关键发现是：部分模型在获得中间反馈后<strong>反而表现更差</strong>（over-correction 现象），说明推理时精炼能力是独立于初始规划能力的另一维度。</p>\n</li>\n<li>\n<p><strong>Extraneous Tools Robustness</strong>：人为注入 5 个不相关工具后，模型的工具选择准确率平均下降 23%。更令人担忧的是，模型倾向于<strong>使用冗余工具来填充计划</strong>（幻觉式工具调用），而非坚持最小必要原则——这表明当前 MLLM 缺乏对工具必要性的事前判断能力。</p>\n</li>\n<li>\n<p><strong>Broken Tools Robustness</strong>：当 30% 的工具被标记为不可用时，多数模型的任务成功率接近<strong>腰斩</strong>。更关键的是，模型很少主动寻找替代方案（如用通用工具组合模拟损坏工具的预期效果），而是倾向于在检测到损坏后直接放弃或陷入循环重试。</p>\n</li>\n<li>\n<p><strong>Unsolvable Tasks</strong>：这是最具区分度的设置。表现最差的模型在 87% 的不可解任务上仍然生成了\"详细计划\"——它们<strong>宁可胡说也不拒绝</strong>。这与安全对齐的目标直接冲突：一个不会说\"不\"的 Agent 在生产环境中是危险的。</p>\n</li>\n</ol>\n<h5>关键发现与下游验证</h5>\n<p>论文在 200 ToolSandbox 和 200 τ²-bench 任务上的验证实验表明，APB 诊断信号具有<strong>可迁移的改进价值</strong>。具体而言，将 APB 评分作为精炼提示的一部分输入模型后，三个代表性模型的 plan grade 平均提升 12-18%，且这一提升<strong>一致地传递到了下游执行指标</strong>（任务成功率提升 8-15%）。这确认了 APB 作为\"上游诊断补集\"的定位：它不替代执行基准，而是提供执行基准无法提供的细粒度信号，形成<strong>诊断→精炼→执行验证</strong>的完整闭环。</p>\n<div class=\"key-point\">💡 关键：APB 的最大贡献不在于\"又一个基准\"，而在于它对 Agent 失败模式的<strong>解剖学视角</strong>。正如医学诊断需要验血、CT、心电图等多维度检查，Agent 评估也需要从规划正确性、工具选择、鲁棒性、拒绝校准等多个角度进行——这正是 APB 的设计哲学。</div>\n<h5>与传统方法的区别</h5>\n<div class=\"table-wrap\"><table>\n<thead>\n<tr>\n<th>维度</th>\n<th>传统 Agent 基准（WebArena 等）</th>\n<th>APB</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>评测目标</td>\n<td>端到端任务成功率</td>\n<td>纯规划能力（解耦执行）</td>\n</tr>\n<tr>\n<td>反馈粒度</td>\n<td>二元成功/失败</td>\n<td>多维诊断评分（5个维度）</td>\n</tr>\n<tr>\n<td>鲁棒性测试</td>\n<td>通常无</td>\n<td>系统地注入冗余/损坏工具</td>\n</tr>\n<tr>\n<td>拒绝能力</td>\n<td>不涉及</td>\n<td>专门设不可解任务测试校准</td>\n</tr>\n<tr>\n<td>改善路径</td>\n<td>缺乏直接指导</td>\n<td>APB 信号可直接引导精炼</td>\n</tr>\n</tbody>\n</table></div>",
      "quiz": {
        "q": "APB 为何要将规划能力与执行能力解耦进行评测？",
        "options": [
          "因为规划比执行更重要，应该单独优化",
          "因为端到端评测无法区分失败根因是'想错了'还是'做错了'，解耦后可精确定位瓶颈并针对性改进",
          "因为规划模块和执行模块在代码实现上是完全分离的",
          "因为执行能力的评测已有足够多的基准，不需要再添加"
        ],
        "answer": 1,
        "explain": "端到端成功率将规划错误与执行错误混淆，导致开发者无法定位问题源头。APB 通过纯规划评测将二者解耦，使得'诊断→精炼→验证'的闭环成为可能。"
      }
    }
  ],
  "categories": {
    "foundation": {
      "label": "奠基范式",
      "color": "#0F766E"
    },
    "learning": {
      "label": "工具学习与选择",
      "color": "#2563EB"
    },
    "orchestration": {
      "label": "规划与执行编排",
      "color": "#EA580C"
    },
    "protocol": {
      "label": "标准协议",
      "color": "#7C3AED"
    },
    "evaluation": {
      "label": "评测基准",
      "color": "#DC2626"
    }
  },
  "projectUrls": {}
};
