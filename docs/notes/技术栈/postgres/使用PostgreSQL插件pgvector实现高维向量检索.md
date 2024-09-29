## **插件管理**

- 创建插件
    
    ```
    CREATE EXTENSION IF NOT EXISTS vector;
    ```
    
- 删除插件
    
    ```
    DROP EXTENSION vector;
    ```
    
- 更新插件
    
    ```
    ALTER EXTENSION vector UPDATE [ TO new_version ]
    ```
    
    **说明**
    
    **new_version**配置为pgvector的版本，pgvector的最新版本号及相关特性，请参见[pgvector官方文档](https://pgxn.org/dist/vector/#query-options)。


## **使用示例**

如下仅是对pgvector的简单使用示例，更多使用方法，请参见[pgvector官方文档](https://pgxn.org/dist/vector/#query-options)。

1. 创建一个存储vector类型的表（items），用于存储embeddings。
    
    ```
    CREATE TABLE items (
      id bigserial PRIMARY KEY, 
      item text, 
      embedding vector(2)
    );
    ```
    
    **说明**
    
    上述示例中，以二维为例，pgvector最大支持创建16000维度的向量。
    
2. 将向量数据插入表中。
    
    ```
    INSERT INTO
      items (item, embedding)
    VALUES
      ('苹果', '[1, 1]'),
      ('香蕉', '[1.2, 0.8]'),
      ('猫', '[6, 0.4]');
    ```
    
3. 使用余弦相似度操作符`<=>`计算香蕉与苹果、猫之间的相似度。
    
    ```
    SELECT
      item,
      1 - (embedding <=> '[1.2, 0.8]') AS cosine_similarity
    FROM
      items
    ORDER BY
      cosine_similarity DESC;
    ```
    
    **说明**
    
    - 在上述示例中，使用公式`cosine_similarity = 1 - cosine_distance`进行计算，距离越近，相似度越高。
    - 您也可以使用欧氏距离操作符`<->`或内积运算操作符`<#>`计算相似度。
    
    结果示例：
    
    ```
    item | cosine_similarity
    ------+--------------------
     香蕉 |                  1
     苹果 |  0.980580680748848
     猫   |  0.867105556566985
    ```
    
    在上述结果中：
    
    - 香蕉结果为1，表示完全匹配。
    - 苹果的结果为0.98，表示苹果与香蕉高度相似。
    - 猫的结果为0.86，表示猫与香蕉相似度较低。