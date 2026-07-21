window.ZHUTIAN_MAP_DATA = {
  locations: [
    {
      id: "qingshi", name: "青石村", subtitle: "故事起点", x: 14, y: 73,
      status: "explored", group: "main", confidence: "确定事实",
      description: "幸格、史迪与晨曦从凡人阶段卷入陨星、黑衣修士与玄天旧案。村中证词仍需与实物证据交叉核验。",
      events: ["青石村陨星", "黑衣修士之死", "旧案起点"]
    },
    {
      id: "crater", name: "后山陨星坑", subtitle: "青铜残碑封印区", x: 20, y: 48,
      status: "explored", group: "main", confidence: "确定事实",
      description: "幸格在此取得青铜匣。强开匣时，黑金骨钉从匣中冒出并扎入右掌——这是骨钉唯一锁定的起点。",
      events: ["取得青铜匣", "黑金骨钉入掌", "封印区"],
      note: "禁止改写为幼年或十年前已存在。"
    },
    {
      id: "ancestral", name: "枯井 · 祖碑", subtitle: "三证破令之地", x: 26, y: 72,
      status: "explored", group: "main", confidence: "确定事实",
      description: "人证、物证与心证在此构成三证破令。陆沉证手锁住血誓线，韩照的执法令崩裂，但韩照仍活。",
      events: ["枯井围杀", "三证破令", "祖碑大战"], note: "韩照重伤遁逃，未确认死亡。"
    },
    {
      id: "han", name: "韩家废院", subtitle: "活村阵眼", x: 32, y: 61,
      status: "explored", group: "main", confidence: "确定事实",
      description: "韩家将村民、祖碑、血誓与执法令串成‘活村阵眼’。这里是灰账体系第一次显出完整轮廓的区域。",
      events: ["活村阵眼", "血誓线", "韩家阴谋"]
    },
    {
      id: "xuantian-post", name: "玄天废驿", subtitle: "巡夜残录", x: 42, y: 42,
      status: "explored", group: "main", confidence: "确定事实",
      description: "队伍已完成取旧录阶段，确认顾寒舟真身并带回旧录石匣。假匣沾上半眼追痕，成为后续风险。",
      events: ["巡夜旧阵", "顾寒舟真身", "旧录石匣"], note: "此处已经探索完成，不是待进入地点。"
    },
    {
      id: "liuyun", name: "流云坊", subtitle: "补给与突破", x: 43, y: 80,
      status: "explored", group: "main", confidence: "确定事实",
      description: "幸格、史迪与生枫完成往返整备。幸格亲自买回无铭旧剑，三人之后正式踏入引气一层。",
      events: ["买回无铭旧剑", "营地整备", "踏入引气"], note: "具体花费与交易流水未恢复，不在地图中补写。"
    },
    {
      id: "camp", name: "乱石沟营地", subtitle: "旧营地", x: 55, y: 56,
      status: "explored", group: "main", confidence: "确定事实",
      description: "队伍曾在此休整、保管证物并抵御槐甲账兵。迁营准备一度失败，随后才循苏闻星旧星图转移。",
      events: ["槐甲账兵袭营", "证物区", "迁营起点"]
    },
    {
      id: "kiln", name: "旧陶窑灰账房", subtitle: "过渡追查", x: 58, y: 79,
      status: "explored", group: "branch", confidence: "确定经历 · 细节待补",
      description: "属于已发生的灰账追查阶段。当前只保留地点与行动已发生这一层事实，不倒推未恢复的物品流水。",
      events: ["灰账房", "追查支线", "记录缺口"]
    },
    {
      id: "bridge", name: "西河破桥", subtitle: "反钓节点", x: 68, y: 76,
      status: "explored", group: "branch", confidence: "确定经历 · 细节待补",
      description: "队伍曾在破桥附近进行反钓与追查。行动已确认发生，具体战果与消耗仍等待后续总账复核。",
      events: ["破桥反钓", "灰账追索", "路线节点"]
    },
    {
      id: "mine", name: "北矿", subtitle: "短追区域", x: 72, y: 60,
      status: "explored", group: "branch", confidence: "确定经历 · 细节待补",
      description: "黑木匣争夺后的短追区域。当前正史确认队伍来过，但不补写尚未找回的输赢与战利品细节。",
      events: ["北矿短追", "黑木匣线", "记录缺口"]
    },
    {
      id: "west-well", name: "西井点户主册室", subtitle: "换页计划", x: 70, y: 40,
      status: "explored", group: "main", confidence: "确定事实 · 战后待结算",
      description: "第十一页远引卷、副令与无名替芯构成换页计划。队伍救出村长并脱离，但记户吏生死及战利品尚未正式结算。",
      events: ["换页计划", "救出村长", "记户吏撕册态"], note: "点户笔、真芯、替芯、户脊核等去向不得凭空补全。"
    },
    {
      id: "old-outpost", name: "玄天旧哨站", subtitle: "北岭旧哨 · 当前所在", x: 82, y: 28,
      status: "current", group: "main", confidence: "确定事实",
      description: "全队已迁入北岭旧哨区域。生枫借苏闻星旧星图确认此地至少可安全停留两夜，当前停在第4/15轮。",
      events: ["当前营地", "至少安全两夜", "北岭旧哨 4/15"], note: "幸格、史迪、生枫主动推进；晨曦、阿怪、雪月负责后侧支援。"
    },
    {
      id: "blackwind", name: "黑风山北麓", subtitle: "灰账陷阱", x: 92, y: 20,
      status: "danger", group: "danger", confidence: "已识别危险",
      description: "生枫与旧星图已将这一区域识别为灰账陷阱。地图只标注风险，不假定敌人数量、阵眼或战斗结果。",
      events: ["灰账陷阱", "高危路线", "暂未进入"]
    },
    {
      id: "outer-patrol", name: "玄天宗外巡方向", subtitle: "云外未证区域", x: 94, y: 48,
      status: "unverified", group: "unknown", confidence: "尚未确认",
      description: "旧哨以外的玄天宗外巡方向仍待验证。现阶段不能直接判断安全、敌对，或将远景建筑当作已抵达地点。",
      events: ["路线待验证", "阵营未知", "地图边界"]
    }
  ]
};
