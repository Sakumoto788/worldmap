# 《诸天纪元》地图点位场景与正史战斗 CG

## 文件结构

- `01_点位小场景_PNG/`：14 张高清点位场景，1672×941 PNG。
- `02_正史战斗CG_PNG/`：5 张高清正史战斗 CG，1672×941 PNG。
- `03_网站WebP/点位小场景/`：960×540 WebP，适合地图弹窗与卡片。
- `03_网站WebP/正史战斗CG/`：1600×900 WebP，适合战斗详情页与全屏灯箱。
- `map-media-data.json`：地点、场景、战斗、参战者、结局与连续性信息。
- `map-media-data.js`：无需异步请求的静态站点映射。

## 推荐接入

把 `03_网站WebP` 整个目录复制到官网公开资源目录，再把 `map-media-data.json` 中的相对路径改成网站实际公开路径。

地点弹窗可增加：

```html
<img class="location-scene" src="/world-map/media/点位小场景/01_青石村.webp" alt="青石村">
```

若使用静态版地图，先引入 `map-media-data.js`，再按地点 id 读取：

```js
const media = window.ZHUTIAN_MAP_MEDIA;
const locationMedia = media.locations[location.id];
const sceneUrl = `${media.sceneBasePath}/${locationMedia.scene}`;
const battles = locationMedia.battles.map(
  (id) => `${media.battleBasePath}/${media.battles[id].image}`
);
```

## 连续性边界

- 后山陨星坑仍是青铜匣与黑金骨钉唯一锁定起点。
- 韩照在祖碑战后重伤遁逃，未确认死亡。
- 玄天废驿已经完成取旧录阶段。
- 玄天旧哨站为当前所在。
- 黑风山北麓仅为已识别陷阱；玄天宗外巡方向仍未确认。
- 旧陶窑、西河破桥与北矿没有补写尚未恢复的战果或掉落。
- 古神战、六色合击等未来预演未收录进正史战斗。

## 角色锁定

- 祖碑战：幸格、史迪、晨曦、雪月、阿怪。
- 玄天废驿：幸格、史迪、晨曦、生枫。
- 槐甲账兵袭营：六人全部在场，但晨曦、雪月守证物区，阿怪封入口。
- 追户者遭遇：幸格、史迪、生枫。
- 西井主册室：幸格、史迪、生枫。

页面中的地点标题、简介与状态建议继续由 HTML 渲染，不要烧进图片，方便响应式排版和后续修订。
