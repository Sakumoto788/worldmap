(function () {
  window.ZHUTIAN_MAP_MEDIA = {
    sceneBasePath: "assets/images/scenes",
    battleBasePath: "assets/images/battles",
    locations: {
      qingshi: { scene: "01_qingshi.webp", battles: [] },
      crater: { scene: "02_crater.webp", battles: [] },
      ancestral: { scene: "03_ancestral.webp", battles: ["ancestral-han"] },
      han: { scene: "04_han.webp", battles: [] },
      "xuantian-post": { scene: "05_xuantian-post.webp", battles: ["xuantian-puppets"] },
      liuyun: { scene: "06_liuyun.webp", battles: [] },
      camp: { scene: "07_camp.webp", battles: ["camp-locust", "outside-account-hunters"] },
      kiln: { scene: "08_kiln.webp", battles: [] },
      bridge: { scene: "09_bridge.webp", battles: [] },
      mine: { scene: "10_mine.webp", battles: [] },
      "west-well": { scene: "11_west-well.webp", battles: ["west-well-page-swap"] },
      "old-outpost": { scene: "12_old-outpost.webp", battles: [] },
      blackwind: { scene: "13_blackwind.webp", battles: [] },
      "outer-patrol": { scene: "14_outer-patrol.webp", battles: [] }
    },
    battles: {
      "ancestral-han": { image: "01_ancestral-han.webp" },
      "xuantian-puppets": { image: "02_xuantian-puppets.webp" },
      "camp-locust": { image: "03_camp-locust.webp" },
      "outside-account-hunters": { image: "04_outside-account-hunters.webp" },
      "west-well-page-swap": { image: "05_west-well-page-swap.webp" }
    }
  };
})();