(function () {
  window.ZHUTIAN_MAP_MEDIA = {
    sceneBasePath: "assets/images/scenes",
    battleBasePath: "assets/images/battles",
    locations: {
      qingshi: { scene: "01_青石村.webp", battles: [] },
      crater: { scene: "02_后山陨星坑.webp", battles: [] },
      ancestral: { scene: "03_枯井_祖碑.webp", battles: ["ancestral-han"] },
      han: { scene: "04_韩家废院.webp", battles: [] },
      "xuantian-post": { scene: "05_玄天废驿.webp", battles: ["xuantian-puppets"] },
      liuyun: { scene: "06_流云坊.webp", battles: [] },
      camp: { scene: "07_乱石沟营地.webp", battles: ["camp-locust", "outside-account-hunters"] },
      kiln: { scene: "08_旧陶窑灰账房.webp", battles: [] },
      bridge: { scene: "09_西河破桥.webp", battles: [] },
      mine: { scene: "10_北矿.webp", battles: [] },
      "west-well": { scene: "11_西井点户主册室.webp", battles: ["west-well-page-swap"] },
      "old-outpost": { scene: "12_玄天旧哨站_当前.webp", battles: [] },
      blackwind: { scene: "13_黑风山北麓_危险.webp", battles: [] },
      "outer-patrol": { scene: "14_玄天宗外巡方向_未确认.webp", battles: [] }
    },
    battles: {
      "ancestral-han": { image: "01_祖碑大战韩照_五人破血誓.webp" },
      "xuantian-puppets": { image: "02_玄天废驿_巡夜尸傀战.webp" },
      "camp-locust": { image: "03_乱石沟营地_槐甲账兵袭营.webp" },
      "outside-account-hunters": { image: "04_乱石沟外_追户者遭遇.webp" },
      "west-well-page-swap": { image: "05_西井主册室_换页之战.webp" }
    }
  };
})();
