# 数据上链

定义基本数据结构

```go
type FarmBatch struct {
	FarmList []Farm `json:"farm_list"` // 手动批量农场信息
}

type Farm struct {
	TenantId string `json:"tenant_id"` // 公司ID
	FarmId   string `json:"farm_id"`   // 农场id
	SectionIdList []string `json:"section_id_list"` // 地块列表
	SoilTestReportList  []TestReport `json:"soil_test_report_list"`  // 检测报告
	WaterTestReportList []TestReport `json:"water_test_report_list"` // 检测报告
	Status              int          `json:"status"`                 // 数据状态，0正常，1删除。
}

```

接受请求体，反序列化，上传到区块链存储

```go
func PutFarm(c *gin.Context) {
	//farm := &define.Farm{}
	farmBatch := &define.FarmBatch{}
	body, err := ioutil.ReadAll(c.Request.Body)
	if err != nil {
		errStr := fmt.Sprintf("get body error %v", err)
		utils.Response(errStr, c, http.StatusBadRequest)
	}
	if err := json.Unmarshal(body, farmBatch); err != nil {
		errStr := fmt.Sprintf("json unmarshal error %v", err)
		utils.Response(errStr, c, http.StatusBadRequest)
	}
	if len(farmBatch.FarmList) == 0 {
		return
	}
	txId := ""
	for _, farm := range farmBatch.FarmList {
		data, err := json.Marshal(farm)
		if err != nil {
			errStr := fmt.Sprintf("json marshal error %v", err)
			utils.Response(errStr, c, http.StatusBadRequest)
		}
		// 更新链上数据
		info := []string{"PutFarm", string(data)}
		resp, err := gohfc.GetHandler().SyncInvoke(info, "", "")
		if err != nil {
			errStr := fmt.Sprintf("数据上链失败 %v", err)
			utils.Response(errStr, c, http.StatusBadRequest)
		}
		txId = resp.TxID
	}
	utils.Response(txId, c, http.StatusOK)
	return
}
```