# 四、核心技术栈二：GIS 地理信息系统

> **写在前面**：GIS 是农业数字化的"地图底座"。每一块农田、每一个传感器、每一张遥感影像，最终都要落到地图上才能产生价值。对后端工程师来说，理解 GIS 的核心概念不需要成为制图专家，但必须能设计空间数据库、处理坐标系问题、写出正确的空间查询。这一节的目标是让你具备这个能力。

---

## 4.1 基础概念

### 两种数据模型：矢量 vs 栅格

GIS 里所有数据都属于这两类之一，先把它们分清楚，后面的操作才不会乱。

#### 矢量数据（Vector）

用**几何形状**描述地理要素，附带属性表。

```
点（Point）  → 采样点、气象站、农机位置
线（Line）   → 道路、灌溉渠、电力线
面（Polygon）→ 地块边界、行政区划、洪涝区域
```

类比：把矢量数据想象成数据库里的一张表，每一行是一个地理要素，有空间列（几何形状）和若干属性列。

```
地块表（parcels）：
┌──────────┬────────────────────────┬──────┬──────┬────────────┐
│ parcel_id│ geometry (Polygon)     │ area │ crop │ owner_id   │
├──────────┼────────────────────────┼──────┼──────┼────────────┤
│ P001     │ POLYGON((116.3 39.9,…))│ 5.2ha│ 水稻 │ F00123     │
│ P002     │ POLYGON((116.4 39.8,…))│ 3.8ha│ 玉米 │ F00456     │
└──────────┴────────────────────────┴──────┴──────┴────────────┘
```

**常见格式**：
- **Shapefile (.shp)**：老牌格式，GIS 行业历史遗产，由至少 3 个文件组成（.shp/.dbf/.shx），笨重但通用性好
- **GeoJSON**：JSON 的空间扩展，Web 开发首选，可读性好
- **GeoPackage (.gpkg)**：SQLite 封装，单文件，推荐替代 Shapefile
- **FlatGeobuf**：高性能流式读取，云原生场景新宠

#### 栅格数据（Raster）

把地理空间切割成**规则格网**（像元），每个像元存一个或多个数值。

```
┌───┬───┬───┬───┐
│0.3│0.6│0.7│0.5│  ← 每格是一个像元，值代表 NDVI
├───┼───┼───┼───┤
│0.2│0.8│0.9│0.4│
├───┼───┼───┼───┤
│0.1│0.7│0.8│0.3│
└───┴───┴───┴───┘
分辨率 = 10m/像元，意味着每个格子对应地面 10×10m 的区域
```

类比：把栅格数据想象成一张 Excel 表格，行列就是空间坐标，单元格的值是该位置的测量结果。

**农业中的栅格数据**：
- 卫星影像（Sentinel-2、Landsat）
- DEM（数字高程模型）
- 土壤图（插值后的连续面）
- 气象格网（ERA5、CHIRPS 降雨数据）

**常见格式**：
- **GeoTIFF (.tif)**：行业标准，支持多波段、地理元数据嵌入
- **NetCDF (.nc)**：气象、海洋领域主流，支持时序多维数据
- **COG（Cloud Optimized GeoTIFF）**：GeoTIFF 的云原生变体，支持 HTTP Range 请求，不用下载整个文件就能读取局部

#### 核心区别一句话

> 矢量适合描述**离散要素**（这块地、这条渠）；栅格适合描述**连续现象**（温度分布、植被覆盖度）。农业项目里两者必须配合使用。

---

### 坐标系：农业项目最容易踩的坑

坐标系是 GIS 里最让人头疼的概念，但农业项目里坑特别多，必须搞清楚。

#### 三个层次

**1. 地理坐标系（GCS）**：用经纬度表示位置，单位是度（°）

```
常见 GCS：
- WGS84 (EPSG:4326)  → GPS 设备输出，国际通用
- CGCS2000 (EPSG:4490)→ 中国大地坐标系，国内法定坐标系，2008 年后政府项目必用
```

WGS84 和 CGCS2000 的椭球体参数几乎一致，误差 < 1m，**工程上可以近似等同处理**。但法规上，国内政府项目的空间数据必须采用 CGCS2000，提交成果时注意。

**2. 投影坐标系（PCS）**：把球面"压平"到平面，单位是米（m）

```
把地球展开到平面，必然有形变——鱼和熊掌不可兼得：
- 保形（形状不变）：Mercator 投影
- 保面积（面积不变）：Albers 等积投影
- 保距离：Azimuthal Equidistant 投影

农业常用：
- WGS84 / UTM Zone 50N (EPSG:32650) → 中国东部地区精确距离和面积计算
- CGCS2000 / 高斯-克吕格 3° 带  → 国内大比例尺地形图标准投影
```

**为什么农业项目必须用投影坐标系做计算？**

因为在地理坐标系里，1° 的经度对应的实际距离随纬度变化（赤道约 111km，北纬 40° 约 85km）。如果直接用经纬度计算地块面积，误差会很大。

```python
import geopandas as gpd

gdf = gpd.read_file("parcels.geojson")  # WGS84, 单位°

# 错误：直接用经纬度计算（结果是平方度，没有意义）
gdf["area_wrong"] = gdf.geometry.area

# 正确：先投影到平面坐标系，再计算（结果是平方米）
gdf_proj = gdf.to_crs(epsg=32650)  # UTM Zone 50N
gdf["area_m2"] = gdf_proj.geometry.area
gdf["area_ha"] = gdf["area_m2"] / 10000  # 转公顷
```

**3. 国内特有的加偏坐标系（GCJ-02）**

这是国内特有的坑：

```
WGS84（真实坐标）
    ↓ 加密偏移（火星坐标系算法）
GCJ-02（高德、腾讯、谷歌中国使用）
    ↓ 再次偏移
BD-09（百度专用）
```

- GPS 设备输出的是 **WGS84**
- 高德地图、腾讯地图底图是 **GCJ-02**
- 百度地图底图是 **BD-09**

**实际问题**：用 GPS 采集的地块坐标（WGS84）直接叠加到高德底图上，会有 **100-700m 的偏移**，在地图上看地块边界整体错位。

```python
# 坐标转换示例：WGS84 → GCJ-02
import math

def wgs84_to_gcj02(lng, lat):
    """WGS84 转 GCJ-02（火星坐标）"""
    a = 6378245.0  # 克拉索夫斯基椭球长半轴
    ee = 0.00669342162296594323  # 偏心率平方

    if not _out_of_china(lng, lat):
        d_lat = _transform_lat(lng - 105.0, lat - 35.0)
        d_lng = _transform_lng(lng - 105.0, lat - 35.0)
        rad_lat = lat / 180.0 * math.pi
        magic = math.sin(rad_lat)
        magic = 1 - ee * magic * magic
        sqrt_magic = math.sqrt(magic)
        d_lat = (d_lat * 180.0) / ((a * (1 - ee)) / (magic * sqrt_magic) * math.pi)
        d_lng = (d_lng * 180.0) / (a / sqrt_magic * math.cos(rad_lat) * math.pi)
        return lng + d_lng, lat + d_lat
    return lng, lat

# 实际项目建议用成熟库：
# pip install coordtransform
```

**工程建议**：内部数据库统一存 WGS84；渲染到高德/腾讯底图时在前端做实时转换；渲染到 Mapbox/OpenStreetMap 底图时无需转换。

---

## 4.2 农业 GIS 核心操作

### 地块管理

地块（Parcel/Field）是农业数字化的基本空间单元，几乎所有数据最终都要关联到地块。

#### 地块数据的核心属性

```python
# 一个完整的地块记录示例（GeoJSON）
{
  "type": "Feature",
  "geometry": {
    "type": "Polygon",
    "coordinates": [[[116.32, 39.92], [116.34, 39.92],
                     [116.34, 39.90], [116.32, 39.90],
                     [116.32, 39.92]]]
  },
  "properties": {
    "parcel_id": "P20240001",
    "area_ha": 5.23,           # 实测面积（公顷）
    "crop_type": "水稻",
    "owner_id": "F00123",      # 农户 ID
    "contract_no": "HB2023001",# 土地承包合同号
    "land_grade": "二等",      # 土地质量等级
    "irrigation": "水浇地",    # 灌溉条件
    "created_at": "2024-03-15",
    "updated_at": "2024-03-15"
  }
}
```

#### 地块常见操作（用 Shapely + GeoPandas 演示）

```python
import geopandas as gpd
import pandas as pd
from shapely.geometry import Polygon, MultiPolygon
from shapely.ops import unary_union

# 读取地块数据
parcels = gpd.read_file("parcels.geojson")

# 1. 面积计算（先投影）
parcels_proj = parcels.to_crs(epsg=32650)
parcels["area_ha"] = parcels_proj.geometry.area / 10000

# 2. 合并相邻地块（同一农户的多块地合并）
farmer_fields = parcels.dissolve(by="owner_id", aggfunc={"area_ha": "sum"})

# 3. 地块分割（沿道路分割，实际场景：土地确权时的地块重新划分）
road = gpd.read_file("roads.geojson").geometry[0]
split_parcels = []
for geom in parcels.geometry:
    parts = geom.difference(road.buffer(2))  # 道路两侧各 2m 缓冲
    if parts.geom_type == "MultiPolygon":
        for part in parts.geoms:
            split_parcels.append(part)
    else:
        split_parcels.append(parts)

# 4. 找出面积 < 0.5 公顷的细碎地块（土地流转分析）
small_parcels = parcels[parcels["area_ha"] < 0.5]
print(f"细碎地块占比: {len(small_parcels)/len(parcels)*100:.1f}%")

# 5. 空间连接：找出每个地块所在的行政村
villages = gpd.read_file("villages.geojson")
parcels_with_village = gpd.sjoin(
    parcels, villages[["village_name", "geometry"]],
    how="left", predicate="within"
)
```

---

### 空间叠加分析

农业里最有价值的分析往往来自多层数据的叠加：把地块、土壤图、气象格网叠加在一起，才能做到"精准化管理分区"。

#### 概念图

```
地块边界（矢量）
    ×
土壤养分图（栅格/矢量）
    ×
气象插值格网（栅格）
    ↓
每个地块的综合属性 → 精准化管理分区 → 变量施肥图
```

#### 实操：地块 × 土壤图叠加分析

```python
import rasterio
import numpy as np
from rasterio.mask import mask
import geopandas as gpd
import json

# 场景：提取每个地块内的平均土壤有机质含量

parcels = gpd.read_file("parcels.geojson")
soil_om_raster = rasterio.open("soil_organic_matter.tif")  # 土壤有机质栅格图

results = []
for _, row in parcels.iterrows():
    # 用地块多边形裁剪栅格
    geom = [json.loads(row.geometry.json)]
    try:
        out_image, _ = mask(soil_om_raster, geom, crop=True, nodata=np.nan)
        values = out_image[0].flatten()
        valid_values = values[~np.isnan(values)]

        results.append({
            "parcel_id": row["parcel_id"],
            "om_mean": np.mean(valid_values),    # 平均有机质
            "om_std": np.std(valid_values),      # 有机质变异程度（越大越不均匀）
            "om_min": np.min(valid_values),
            "om_max": np.max(valid_values),
        })
    except Exception:
        results.append({"parcel_id": row["parcel_id"], "om_mean": None})

df_result = pd.DataFrame(results)
parcels = parcels.merge(df_result, on="parcel_id")

# 按有机质含量分区（变量施肥的依据）
parcels["fertilizer_zone"] = pd.cut(
    parcels["om_mean"],
    bins=[0, 10, 20, 30, 100],
    labels=["高施肥区", "中施肥区", "低施肥区", "减施区"]
)
```

#### 实操：气象格网数据叠加

```python
import xarray as xr

# ERA5 气象数据是 NetCDF 格式，包含温度、降雨等变量的空间格网
ds = xr.open_dataset("era5_2023.nc")
precip = ds["total_precipitation"]  # 降水量，单位 m/hour

# 提取某地块位置的 2023 年全年降雨量
parcel_lon, parcel_lat = 116.32, 39.92
annual_precip = float(
    precip.sel(longitude=parcel_lon, latitude=parcel_lat, method="nearest")
         .sum()
         .values
) * 1000  # 转 mm

print(f"地块年降雨量：{annual_precip:.0f} mm")
```

---

### 空间插值：克里金（Kriging）做土壤养分图

实际农业中，不可能对每块地的每个位置都做土壤采样——成本太高。通常的做法是：在地块内按一定密度布置采样点（比如每 5 公顷一个点），实验室化验后，用**空间插值**推算整个地块的养分分布图。

#### 为什么用克里金而不是普通插值

普通插值（IDW、样条）只考虑距离，克里金（Kriging）额外考虑了**空间自相关结构**——相邻位置的土壤养分天然是相关的，而且这种相关性随距离衰减的方式可以从样本数据中学出来。

克里金的核心：**变差函数（Variogram）**

```
γ(h) = ½ × Var[Z(x) - Z(x+h)]

解读：距离为 h 的两个采样点，其差值方差的一半
      h 越大，γ(h) 越大（空间相关性越弱）
      当 γ(h) 趋于稳定（基台值），说明超过这个距离就不相关了
```

```python
# 使用 pykrige 库做普通克里金插值
from pykrige.ok import OrdinaryKriging
import numpy as np
import matplotlib.pyplot as plt

# 采样点数据
sample_points = {
    "lon": [116.30, 116.32, 116.34, 116.31, 116.33],
    "lat": [39.90, 39.91, 39.90, 39.92, 39.92],
    "nitrogen": [45.2, 52.1, 38.7, 61.3, 49.8]  # 土壤速效氮，单位 mg/kg
}

# 创建克里金模型
ok = OrdinaryKriging(
    x=sample_points["lon"],
    y=sample_points["lat"],
    z=sample_points["nitrogen"],
    variogram_model="spherical",   # 球状变差函数，土壤养分最常用
    verbose=False,
    enable_plotting=False,
)

# 生成预测格网（50m 分辨率）
grid_lon = np.arange(116.30, 116.35, 0.0005)
grid_lat = np.arange(39.90, 39.93, 0.0005)

z_pred, z_variance = ok.execute("grid", grid_lon, grid_lat)

# z_pred：预测的养分分布图
# z_variance：每个位置的预测方差（越大越不确定，需要补充采样）
print(f"预测范围：{z_pred.min():.1f} ~ {z_pred.max():.1f} mg/kg")
print(f"高不确定性区域占比：{(z_variance > z_variance.mean()).sum()/z_variance.size:.1%}")
```

**变差函数模型选择参考**：
- **球状（Spherical）**：土壤养分、降雨量，最常用
- **指数（Exponential）**：衰减更平缓，适合大尺度地形变量
- **高斯（Gaussian）**：衰减最平滑，适合变化连续的变量

---

### 坡度 / 坡向分析

DEM（数字高程模型）不只是一张地形图，从它可以派生出很多对农业有价值的信息。

```
DEM
 ├── 坡度（Slope）→ 是否适合机械化作业（坡度 > 15° 的地块，大型农机无法操作）
 ├── 坡向（Aspect）→ 阳坡 / 阴坡影响光照，进而影响作物选择
 ├── 汇流方向（Flow Direction）→ 农田排水设计、洪涝风险评估
 └── 地形湿度指数（TWI）→ 预测土壤水分积累区域
```

```python
import numpy as np
import rasterio
from rasterio.transform import Affine

def calculate_slope_aspect(dem_path):
    """从 DEM 计算坡度和坡向"""
    with rasterio.open(dem_path) as src:
        dem = src.read(1).astype(float)
        transform = src.transform
        cell_size = transform.a  # 像元大小（米）

    # 用 Sobel 算子计算梯度（南北方向 / 东西方向）
    # 水平方向梯度（东西）
    dz_dx = np.gradient(dem, axis=1) / cell_size
    # 垂直方向梯度（南北）
    dz_dy = np.gradient(dem, axis=0) / cell_size

    # 坡度（度）
    slope = np.degrees(np.arctan(np.sqrt(dz_dx**2 + dz_dy**2)))

    # 坡向（度，0=北，顺时针）
    aspect = np.degrees(np.arctan2(-dz_dy, dz_dx))
    aspect = np.where(aspect < 0, 90 - aspect, 360 - aspect + 90)
    aspect = np.where(aspect >= 360, aspect - 360, aspect)

    return slope, aspect

slope, aspect = calculate_slope_aspect("dem_30m.tif")

# 宜机作业分析
suitable_for_machinery = slope < 6    # 坡度 < 6° 适合大型农机
marginal_machinery = (slope >= 6) & (slope < 15)  # 6-15° 小型农机可作业
unsuitable = slope >= 15              # > 15° 只能人工

print(f"适宜机械化：{suitable_for_machinery.mean():.1%}")
print(f"边际可用：{marginal_machinery.mean():.1%}")
print(f"不适宜：{unsuitable.mean():.1%}")

# 坡向分析：南坡（135°-225°）光照最充足
south_facing = (aspect >= 135) & (aspect <= 225)
print(f"南坡（光照充足）占比：{south_facing.mean():.1%}")
```

---

## 4.3 工具选型与学习路径

### 工具全景

| 工具 | 定位 | 学习优先级 | 说明 |
|------|------|----------|------|
| QGIS | 开源桌面 GIS，功能完整 | ★★★★★ 必学 | 可视化探索数据首选，免费替代 ArcGIS |
| PostGIS | PostgreSQL 空间扩展 | ★★★★ 重要 | 生产环境空间数据库标准方案 |
| Shapely + GeoPandas | Python 空间分析 | ★★★★ 重要 | 数据处理流水线核心 |
| GDAL / rasterio | 栅格数据读写 | ★★★★ 重要 | 底层栅格处理，几乎所有工具的底座 |
| Leaflet / MapboxGL | 前端地图可视化 | ★★★ 按需 | 做 Web 产品时用 |
| ArcGIS / SuperMap | 商业 GIS | ★★ 了解 | 政府项目甲方可能指定要求 |

---

### PostGIS：空间数据库设计

生产系统里不能只靠文件管理空间数据，PostGIS 是行业标准答案。它把空间数据能力直接嵌入 PostgreSQL，支持空间索引和几十种空间函数。

#### 安装与初始化

```sql
-- 安装 PostGIS 扩展（一次性操作）
CREATE EXTENSION postgis;
CREATE EXTENSION postgis_topology;

-- 验证安装
SELECT PostGIS_Version();
```

#### 地块管理数据库设计

```sql
-- 地块主表
CREATE TABLE parcels (
    id          SERIAL PRIMARY KEY,
    parcel_code VARCHAR(20) UNIQUE NOT NULL,  -- 业务唯一码
    geom        GEOMETRY(Polygon, 4326),       -- 地块多边形，WGS84
    area_ha     NUMERIC(10, 4),               -- 面积（公顷）
    crop_type   VARCHAR(50),
    owner_id    INTEGER REFERENCES farmers(id),
    land_grade  SMALLINT CHECK (land_grade BETWEEN 1 AND 6),
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 空间索引（必须建，否则空间查询慢到无法使用）
CREATE INDEX idx_parcels_geom ON parcels USING GIST (geom);

-- 采样点表
CREATE TABLE soil_samples (
    id          SERIAL PRIMARY KEY,
    parcel_id   INTEGER REFERENCES parcels(id),
    geom        GEOMETRY(Point, 4326),
    sampled_at  DATE,
    nitrogen    NUMERIC(8, 2),    -- 速效氮 mg/kg
    phosphorus  NUMERIC(8, 2),    -- 速效磷 mg/kg
    potassium   NUMERIC(8, 2),    -- 速效钾 mg/kg
    ph          NUMERIC(4, 2),
    organic_m   NUMERIC(8, 2)     -- 有机质 g/kg
);

CREATE INDEX idx_soil_samples_geom   ON soil_samples USING GIST (geom);
CREATE INDEX idx_soil_samples_parcel ON soil_samples (parcel_id);
```

#### 常用空间查询

```sql
-- 1. 查找某点（GPS 位置）所在的地块
SELECT parcel_code, crop_type, area_ha
FROM parcels
WHERE ST_Contains(geom, ST_SetSRID(ST_MakePoint(116.325, 39.915), 4326));

-- 2. 查找某行政区内所有地块（空间连接）
SELECT p.parcel_code, p.area_ha, p.crop_type
FROM parcels p
JOIN villages v ON ST_Within(p.geom, v.geom)
WHERE v.village_name = '东王庄村';

-- 3. 统计某村水稻种植面积
SELECT v.village_name,
       COUNT(*) AS parcel_count,
       SUM(p.area_ha) AS total_ha
FROM parcels p
JOIN villages v ON ST_Within(p.geom, v.geom)
WHERE p.crop_type = '水稻'
GROUP BY v.village_name
ORDER BY total_ha DESC;

-- 4. 找出 500m 缓冲区内有水源的地块（灌溉条件分析）
SELECT DISTINCT p.parcel_code
FROM parcels p, water_bodies w
WHERE ST_DWithin(
    p.geom::geography,           -- 用 geography 类型，单位直接是米
    w.geom::geography,
    500
);

-- 5. 计算地块实际面积（投影后计算，单位公顷）
SELECT parcel_code,
       ST_Area(ST_Transform(geom, 32650)) / 10000 AS area_ha_accurate
FROM parcels;

-- 6. 检测重叠地块（土地确权中的常见问题）
SELECT a.parcel_code AS parcel_a,
       b.parcel_code AS parcel_b,
       ST_Area(ST_Intersection(a.geom, b.geom)::geography) AS overlap_m2
FROM parcels a, parcels b
WHERE a.id < b.id                          -- 避免重复对
  AND ST_Intersects(a.geom, b.geom)
  AND NOT ST_Touches(a.geom, b.geom)       -- 排除只相切的情况
HAVING ST_Area(ST_Intersection(a.geom, b.geom)::geography) > 1;  -- 重叠 > 1㎡
```

**重要函数速查**：

```sql
ST_Contains(a, b)      -- a 是否完全包含 b
ST_Within(a, b)        -- a 是否在 b 内（= ST_Contains(b, a)）
ST_Intersects(a, b)    -- a 和 b 是否有交集
ST_Touches(a, b)       -- a 和 b 是否只相切（不重叠）
ST_DWithin(a, b, d)    -- a 和 b 的距离是否 ≤ d
ST_Distance(a, b)      -- 计算 a 和 b 的距离
ST_Area(geom)          -- 计算面积
ST_Length(geom)        -- 计算长度
ST_Buffer(geom, d)     -- 创建缓冲区
ST_Union(geom)         -- 合并几何
ST_Intersection(a, b)  -- 取交集
ST_Difference(a, b)    -- 差集（a 减去 a∩b 的部分）
ST_Transform(geom, srid) -- 坐标系转换
```

---

### 前端地图可视化（Leaflet 示例）

Web 产品里需要在地图上展示地块，最轻量的方案是 Leaflet + GeoJSON。

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <style> #map { height: 600px; } </style>
</head>
<body>
<div id="map"></div>
<script>
// 初始化地图（使用 OpenStreetMap 底图，无需密钥）
const map = L.map('map').setView([39.91, 116.32], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// 加载地块 GeoJSON，按 NDVI 着色
fetch('/api/parcels/geojson')
  .then(r => r.json())
  .then(data => {
    L.geoJSON(data, {
      style: feature => ({
        color: '#333',
        weight: 1,
        fillColor: ndviToColor(feature.properties.ndvi_mean),
        fillOpacity: 0.7,
      }),
      onEachFeature: (feature, layer) => {
        layer.bindPopup(`
          <b>${feature.properties.parcel_code}</b><br>
          作物：${feature.properties.crop_type}<br>
          面积：${feature.properties.area_ha.toFixed(2)} 公顷<br>
          NDVI：${feature.properties.ndvi_mean?.toFixed(3) ?? '无数据'}
        `);
      }
    }).addTo(map);
  });

// NDVI 值映射到颜色（红→黄→绿）
function ndviToColor(ndvi) {
  if (ndvi === null || ndvi === undefined) return '#cccccc';
  if (ndvi < 0.2) return '#d73027';   // 红：几乎无植被
  if (ndvi < 0.4) return '#fc8d59';   // 橙：稀疏植被
  if (ndvi < 0.6) return '#fee08b';   // 黄：中等植被
  if (ndvi < 0.8) return '#91cf60';   // 浅绿：良好植被
  return '#1a9850';                    // 深绿：旺盛植被
}
</script>
</body>
</html>
```

---

## 学习路径（从零到能用）

### 第 1 周：QGIS 操作入门

目标：能用 QGIS 完成基础的地块数据可视化和分析

1. 下载安装 QGIS（qgis.org，选 LTR 版本）
2. 下载一份真实数据练手：
   - 行政边界：[阿里云 DataV 地理小工具](https://datav.aliyun.com/portal/school/atlas/area_selector)
   - 土地利用：全国土地调查数据（国土三调，部分省份公开）
3. 完成操作练习：
   - 加载 Shapefile / GeoJSON，查看属性表
   - 按属性字段（比如作物类型）给地块分类着色
   - 用矢量工具做图层叠加（相交 / 裁剪）
   - 导出地图为 PNG / PDF

### 第 2 周：GeoPandas 入门

目标：能用 Python 做地块统计分析

```python
# 练习脚本：统计某区域各作物类型的种植面积

import geopandas as gpd
import matplotlib.pyplot as plt

# 读取数据
parcels = gpd.read_file("parcels.geojson")

# 计算面积（投影后）
parcels_proj = parcels.to_crs(epsg=32650)
parcels["area_ha"] = parcels_proj.geometry.area / 10000

# 按作物类型汇总
crop_stats = (
    parcels.groupby("crop_type")
    .agg(
        parcel_count=("parcel_id", "count"),
        total_area_ha=("area_ha", "sum"),
        avg_area_ha=("area_ha", "mean"),
    )
    .sort_values("total_area_ha", ascending=False)
)
print(crop_stats)

# 可视化
fig, axes = plt.subplots(1, 2, figsize=(14, 6))
parcels.plot(column="crop_type", categorical=True, legend=True, ax=axes[0])
axes[0].set_title("地块分布图（按作物类型）")

crop_stats["total_area_ha"].plot(kind="bar", ax=axes[1])
axes[1].set_title("各作物种植面积（公顷）")
plt.tight_layout()
plt.savefig("crop_analysis.png", dpi=150)
```

### 第 3 周：PostGIS 实战

目标：设计一个地块管理数据库，能跑空间查询

```bash
# 用 Docker 快速启动 PostGIS（推荐，省去环境问题）
docker run -d \
  --name postgis \
  -e POSTGRES_PASSWORD=secret \
  -p 5432:5432 \
  postgis/postgis:16-3.4

# 连接
psql -h localhost -U postgres -d postgres
```

完成以下练习：
1. 建地块表 + 采样点表 + 行政村表
2. 用 `ogr2ogr` 把 Shapefile 导入 PostGIS
3. 实现上面"常用空间查询"章节中的 6 条 SQL
4. 用 QGIS 连接 PostGIS，验证查询结果可视化正确

### 第 4 周：端到端实战

**目标**：给一个真实县域，做农田面积统计与地图渲染。

```
任务描述：
1. 下载某县 Sentinel-2 影像（GEE）
2. 计算 NDVI，按阈值提取耕地范围（NDVI > 0.3 为农业用地）
3. 将栅格结果矢量化为地块多边形
4. 导入 PostGIS，关联行政村数据
5. 统计各村耕地面积，输出报告
6. 用 Leaflet 做 Web 地图展示
```

---

## 常见问题排查

**Q：PostGIS 空间查询很慢**

→ 检查有没有建 GIST 空间索引：`\d parcels` 确认 `idx_parcels_geom` 存在。如果索引存在还慢，用 `EXPLAIN ANALYZE` 看执行计划，确认走了索引。

**Q：用 ST_Area 计算出来的面积和实际不符**

→ 确认没有直接对 `geometry(Polygon, 4326)` 调用 `ST_Area`，那样算的是平方度。要么先 `ST_Transform` 投影，要么转成 `geography` 类型（`geom::geography`）后调用，geography 类型的 `ST_Area` 返回平方米。

**Q：GeoJSON 在高德地图上显示位置偏**

→ 坐标系偏移问题，GeoJSON 是 WGS84，高德底图是 GCJ-02。在前端加载时做坐标转换，或者在后端返回 GeoJSON 前先把坐标从 WGS84 转成 GCJ-02。

**Q：GeoPandas `read_file` 报错乱码**

→ Shapefile 的 .dbf 属性表默认 GBK 编码（尤其是国内数据）：
```python
gdf = gpd.read_file("parcels.shp", encoding="gbk")
```

**Q：Shapely 合并大量多边形很慢**

→ 用 `unary_union` 而不是逐个 `union`：
```python
from shapely.ops import unary_union
merged = unary_union(list(gdf.geometry))  # O(n log n) vs 逐个 union 的 O(n²)
```

---

## 本章小结

```
核心概念
  ├── 矢量（点线面 + 属性表）vs 栅格（格网 + 像元值）
  ├── 坐标系：WGS84 / CGCS2000 / GCJ-02 三者区别和转换
  └── 投影：面积和距离计算必须先投影到平面坐标系

农业核心操作
  ├── 地块管理：绘制、合并、分割、属性挂载
  ├── 空间叠加：地块 × 土壤 × 气象 = 管理分区
  ├── 克里金插值：稀疏采样点 → 连续养分分布图
  └── DEM 分析：坡度 / 坡向 → 宜机作业分区 / 排水设计

工具链
  ├── 可视化探索：QGIS
  ├── 数据处理：GeoPandas + Shapely + rasterio
  ├── 生产数据库：PostGIS
  └── Web 展示：Leaflet / MapboxGL

下一步
  └── 进入「五、农业物联网」：把传感器数据和地块关联起来，
      实现"这块地的土壤今天含水率是多少"的实时查询
```



4.1 基础概念
- 矢量 vs 栅格的本质区别，用数据库表格类比矢量，用 Excel 类比栅格
- 坐标系三个层次：GCS（WGS84/CGCS2000）、投影坐标系（UTM）、以及国内特有的 GCJ-02 加偏问题——含代码演示为什么面积计算必须先投影

4.2 核心操作
- 地块管理：完整的 GeoJSON 数据结构设计 + 合并/分割/空间连接的 GeoPandas 代码
- 空间叠加：地块 × 土壤栅格叠加提取养分属性，气象 NetCDF 数据读取
- 克里金插值：从概念（变差函数）到 pykrige 实操，含模型选型参考
- DEM 分析：坡度/坡向计算 + 宜机化作业分区的具体代码

4.3 工具选型与学习路径
- PostGIS 数据库设计：建表 DDL + 6 条典型空间查询（含重叠检测、缓冲分析）
- Leaflet 地图可视化：按 NDVI 着色的完整示例
- 四周学习计划：从 QGIS 操作 → GeoPandas → PostGIS → 端到端实战