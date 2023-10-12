## 介绍

PostgreSQL 全文搜索可让您以较高的准确度找到与某些关键字匹配的记录。此查询技术速度很快，因为它实现了索引、高级查询函数和规则。在生产环境中，您应该使用全文搜索来解决模式匹配搜索表达式带来的限制。

例如，在电子商务网站中，客户搜索**Party Dress**。模式匹配搜索算法无法返回部分匹配的记录，如**Party Ready Dress**。因此，模式匹配不准确且速度慢，因为它们不实现索引。PostgreSQL 全文搜索解决了这些问题。它提供了灵活性、准确性和速度来查找记录并根据相关性对结果进行排名。

为了实现这一点，PostgreSQL 使用了**to_tsvector()**和**to_tsquery()**函数。本指南将引导您完成在 PostgreSQL 数据库中实现全文搜索的过程。

## 先决条件

要遵循本指南，您需要：

- [Linux](https://www.vultr.com/servers/)服务器。
- [具有 sudo 权限的非 root](https://docs.vultr.com/create-a-sudo-user-on-ubuntu-best-practices)用户。
- [PostgreSQL 数据库](https://docs.vultr.com/how-to-install-configure-backup-and-restore-postgresql-on-ubuntu-20-04-lts/)服务器。

## 1. 设置示例数据库

按照以下步骤设置示例数据库，创建表并插入一些测试记录。

1. 以非 root **sudo**用户身份通过 SSH 访问您的 Linux 服务器。
2. **以postgres**用户身份登录 PostgreSQL 服务器。
    
    ```
     $ sudo -u postgres psql
    ```
    
3. 输入密码并按Enter继续。
4. 创建一个示例**电子商务**数据库。
    
    ```
     postgres=# CREATE DATABASE e_commerce;
    ```
    
    输出。
    
    ```
     CREATE DATABASE
    ```
    
5. 切换到新的**电子商务**数据库。
    
    ```
     postgres=# \connect e_commerce;
    ```
    
    输出。
    
    ```
     You are now connected to database "e_commerce" as user "postgres".
    ```
    
6. 创建**产品**表。此表存储产品的详细信息，包括唯一的**product_id**、**product_name**和**retail_price**。在**PRIMARY KEY**列上使用**SERIAL关键字，以允许 PostgreSQL 服务器为新记录****自动**分配新的product_id 。
    
    ```
     e_commerce=# CREATE TABLE products (
                      product_id SERIAL PRIMARY KEY,
                      product_name VARCHAR (50),
                      retail_price NUMERIC(5,2)  
                  );
    ```
    
    输出。
    
    ```
     CREATE TABLE
    ```
    
7. 将示例数据插入**产品**表。
    
    ```
     e_commerce=# INSERT INTO products(product_name, retail_price) VALUES ('BUTTERFLY DECORATIONS', 35.20);
                  INSERT INTO products(product_name, retail_price) VALUES ('DELL WIRELESS MOUSE', 25.50);
                  INSERT INTO products(product_name, retail_price) VALUES ('RIB MEAT', 4.89);
                  INSERT INTO products(product_name, retail_price) VALUES ('LOGITECH WIRELESS MOUSE', 16.50);
                  INSERT INTO products(product_name, retail_price) VALUES ('WIRELESS USB DONGLE FOR DELL', 4.50);
                  INSERT INTO products(product_name, retail_price) VALUES ('FRUITWORLD WATERMELON', 3.25);
                  INSERT INTO products(product_name, retail_price) VALUES ('HP WIRELESS MOUSE', 25.50);
                  INSERT INTO products(product_name, retail_price) VALUES ('RIBENA JUICE', 7.70);
                  INSERT INTO products(product_name, retail_price) VALUES ('DELL WIRELESS KEYBOARD', 25.50);
    ```
    
    输出。
    
    ```
     ...
     INSERT 0 1
    ```
    
8. 通过针对**产品表运行****SELECT**语句来确保示例数据到位。
    
    ```
     e_commerce=# SELECT 
                      product_id,
                      product_name, 
                      retail_price
                  FROM products;
    ```
    
    输出。
    
    ```
      product_id |         product_name         | retail_price
     ------------+------------------------------+--------------
               1 | BUTTERFLY DECORATIONS        |        35.20
               2 | DELL WIRELESS MOUSE          |        25.50
               3 | RIB MEAT                     |         4.89
               4 | LOGITECH WIRELESS MOUSE      |        16.50
               5 | WIRELESS USB DONGLE FOR DELL |         4.50
               6 | FRUITWORLD WATERMELON        |         3.25
               7 | HP WIRELESS MOUSE            |        25.50
               8 | RIBENA JUICE                 |         7.70
               9 | DELL WIRELESS KEYBOARD       |        25.50
     (9 rows)
    ```
    

## **2. to_tsvector()**和**to_tsquery()**函数的基本语法

PostgreSQL 全文搜索的强大之处在于**to_tsvector()**和**to_tsquery()**函数。以下是每个函数工作原理的总结。

### 2.1. **to_tsvector()**函数

此函数调用内部 PostgreSQL 解析器将文档或列值分解为单个单词（标记）。该函数进一步将标记简化为词素（基本单词），因此，像**coming**这样的单词会转换为**come**，而**mangoes**会转换为**mango**。最后，**to_tsvector()函数返回一个tsvector列表，其中包含所有基本单词及其位置，以及****a**和**the** stripped等停用词。

1. 对短语**“大男孩们在他们的父亲接受道歉后来吃芒果”**运行**to_tsvector()**函数，看看它是如何工作的。
    
    ```
     e_commerce=# SELECT to_tsvector('The big boys are coming to eat the mangoes after their fathers accepted their apologies');
    ```
    
2. 上述**to_tsvector()命令输出下面的tsvector**列表。现在所有单词都已提取为其基本词干，并且已排除停用词（如**the**、**are**、**to**和**after） 。**
    
    ```
     'accept':13 'apolog':15 'big':2 'boy':3 'come':5 'eat':7 'father':12 'mango':9
     (1 row)
    ```
    

### 2.2. **to_tsquery()**函数

to_tsquery **()**函数将关键字或关键短语转换为规范化的标记。换句话说，**to_tsquery()函数将搜索词编译为 PostgreSQL 服务器在****tsvector**列表中定位文档/记录时可以理解的结构。

了解了这两个全文搜索功能的工作原理后，您现在可以在数据库中测试它们。

## 3.实现PostgreSQL全文搜索功能

在 PostgreSQL 数据库上执行全文搜索时，必须同时实现**to_tsvector()和to_tsquery()函数以及匹配运算符@@**。

当您对**tsvector**文档运行关键字搜索（**tsquery** ）时，匹配运算符将返回布尔值（**t**或**f** ） 。

1. 在实现全文功能之前，使用关键字**rib**对您的**产品**表进行常规搜索。
    
    ```
     e_commerce=# SELECT * FROM products WHERE product_name like '%RIB%';
    ```
    
2. 下面的常规搜索输出显示两条记录：**RIB MEAT**和**RIBENA JUICE**。但是，上述搜索方法不够智能，无法知道**RIB与****RIBENA JUICE**无关。
    
    ```
      product_id | product_name | retail_price
     ------------+--------------+--------------
               3 | RIB MEAT     |         4.89
               8 | RIBENA JUICE |         7.70
     (2 rows)
    ```
    
3. **使用to_tsvector**和**to_tsquery()**函数再次执行相同的搜索。
    
    ```
     e_commerce=# SELECT * FROM products WHERE to_tsvector(product_name) @@ to_tsquery('RIB');
    ```
    
4. 从下面的输出中可以清楚地看出，全文搜索足够智能，知道**RIBENA JUICE与****RIB**不相关，因此只返回一条记录。那就是**RIB MEAT**。
    
    ```
      product_id | product_name | retail_price
     ------------+--------------+--------------
               3 | RIB MEAT     |         4.89
     (1 row)
    ```
    
5. **使用MOUSE**关键字执行另一次全文搜索。
    
    ```
     e_commerce=# SELECT * FROM products WHERE to_tsvector(product_name) @@ to_tsquery('MOUSE');
    ```
    
6. 上述查询返回三条记录，如下所示。
    
    ```
      product_id |      product_name       | retail_price
     ------------+-------------------------+--------------
               2 | DELL WIRELESS MOUSE     |        25.50
               4 | LOGITECH WIRELESS MOUSE |        16.50
               7 | HP WIRELESS MOUSE       |        25.50
     (3 rows) 
    ```
    

## 4. 使用 PostgreSQL 全文搜索运算符

为了在搜索大型记录集时提供更大的灵活性，PostgreSQL 数据库服务器支持不同的搜索运算符，如下所述。

### 4.1. **&**运算符

使用**AND** / **&**运算符仅返回包含所有由**&**分隔的关键字列表的记录/文档。

1. 运行以下查询以返回所有**DELL WIRELESS**产品。
    
    ```
     e_commerce=# SELECT * FROM products WHERE to_tsvector(product_name) @@ to_tsquery('DELL & WIRELESS');
    ```
    
2. 上述查询返回以下输出。
    
    ```
      product_id |         product_name         | retail_price
     ------------+------------------------------+--------------
               2 | DELL WIRELESS MOUSE          |        25.50
               5 | WIRELESS USB DONGLE FOR DELL |         4.50
               9 | DELL WIRELESS KEYBOARD       |        25.50
     (3 rows)
    ```
    

### 4.2. **|**操作符

使用**OR** / **|**运算符返回与一个或多个搜索关键字匹配的记录。

1. 执行以下查询以返回**LOGITECH**和**HP**品牌的所有产品。
    
    ```
     e_commerce=# SELECT * FROM products WHERE to_tsvector(product_name) @@ to_tsquery('LOGITECH | HP');
    ```
    
2. 上述查询返回以下结果。
    
    ```
      product_id |      product_name       | retail_price
     ------------+-------------------------+--------------
               4 | LOGITECH WIRELESS MOUSE |        16.50
               7 | HP WIRELESS MOUSE       |        25.50
     (2 rows)
    ```
    

### 4.3. **!**操作符

使用**NOT** / **!**运算符排除包含特定关键字的记录。

1. 运行以下语句从搜索结果中排除所有**DELL产品。**
    
    ```
     e_commerce=# SELECT * FROM products WHERE to_tsvector(product_name) @@ to_tsquery('!DELL');
    ```
    
2. 下面的输出显示所有不包括**DELL**产品的产品。
    
    ```
      product_id |      product_name       | retail_price
     ------------+-------------------------+--------------
               1 | BUTTERFLY DECORATIONS   |        35.20
               3 | RIB MEAT                |         4.89
               4 | LOGITECH WIRELESS MOUSE |        16.50
               6 | FRUITWORLD WATERMELON   |         3.25
               7 | HP WIRELESS MOUSE       |        25.50
               8 | RIBENA JUICE            |         7.70
     (6 rows)
    ```
    

### 4.4. **''**操作符

使用双引号**''**运算符返回与精确搜索词匹配的记录。

1. 运行以下命令搜索短语**DELL WIRELESS KEYBOARD**。
    
    ```
     e_commerce=# SELECT * FROM products WHERE to_tsvector(product_name) @@ to_tsquery('''DELL WIRELESS KEYBOARD''');
    ```
    
2. 从下面的输出中，只有一条记录与**DELL WIRELESS KEYBOARD**关键字完全匹配。
    
    ```
      product_id |      product_name      | retail_price
     ------------+------------------------+--------------
               9 | DELL WIRELESS KEYBOARD |        25.50
     (1 row)
    ```
    

### 4.5. 组合多个全文搜索运算符

您可以在单个查询中组合多个搜索运算符来执行更复杂的全文查询。

1. 运行以下查询仅返回来自**DELL**或**HP公司的****无线鼠标**产品。
    
    ```
     e_commerce=# SELECT * FROM products WHERE to_tsvector(product_name) @@ to_tsquery('(DELL | HP) & (WIRELESS & MOUSE)');
    ```
    
2. 查询返回以下两种产品。
    
    ```
      product_id |    product_name     | retail_price
     ------------+---------------------+--------------
               2 | DELL WIRELESS MOUSE |        25.50
               7 | HP WIRELESS MOUSE   |        25.50
     (2 rows)
    ```
    

## 5. 使用预先计算的向量加速全文搜索

在 PostgreSQL 数据库中，全文函数运行速度很快，因为**tsvector**数据类型实现了索引。数据库服务器在搜索过程中执行的唯一困难任务是计算向量。为了在处理大型数据集时加快操作速度，一个好的做法是预先计算向量并将其与记录一起存储在单独的列中。

使用这种方法，除非您更新现有记录，否则数据库服务器只会计算一次向量。这大大加快了全文搜索操作的速度。按照以下步骤将预先计算的向量添加到您的**产品**表中。

1. **向产品**表添加**TSVECTOR**数据类型列，并将其命名为**product_name_tokens**。
    
    ```
     e_commerce=# ALTER TABLE products
                  ADD COLUMN product_name_tokens TSVECTOR;
    ```
    
    输出。
    
    ```
     ALTER TABLE
    ```
    
2. 通过使用语句**to_tsvector(p.product_name)转换产品名称来更新****产品**表中的记录以包含新的向量信息。
    
    ```
     e_commerce=# UPDATE products p  
                     SET product_name_tokens = to_tsvector(p.product_name)  
                  FROM products p2;
    ```
    
    输出。
    
    ```
     UPDATE 9
    ```
    
3. 查询**产品**表以确保您已成功计算向量。
    
    ```
     e_commerce=# SELECT 
                      product_id,
                      product_name, 
                      retail_price,
                      product_name_tokens
                  FROM products;
    ```
    
4. 以下输出显示了记录以及预先计算的向量。按Q继续。
    
    ```
      product_id |         product_name         | retail_price |           product_name_tokens
     ------------+------------------------------+--------------+-----------------------------------------
               1 | BUTTERFLY DECORATIONS        |        35.20 | 'butterfli':1 'decor':2
               2 | DELL WIRELESS MOUSE          |        25.50 | 'dell':1 'mous':3 'wireless':2
               3 | RIB MEAT                     |         4.89 | 'meat':2 'rib':1
               4 | LOGITECH WIRELESS MOUSE      |        16.50 | 'logitech':1 'mous':3 'wireless':2
               5 | WIRELESS USB DONGLE FOR DELL |         4.50 | 'dell':5 'dongl':3 'usb':2 'wireless':1
               6 | FRUITWORLD WATERMELON        |         3.25 | 'fruitworld':1 'watermelon':2
               7 | HP WIRELESS MOUSE            |        25.50 | 'hp':1 'mous':3 'wireless':2
               8 | RIBENA JUICE                 |         7.70 | 'juic':2 'ribena':1
               9 | DELL WIRELESS KEYBOARD       |        25.50 | 'dell':1 'keyboard':3 'wireless':2
     (9 rows)
    ```
    
5. **针对TSVECTOR**数据类型列 ( **product_name_tokens** )运行查询以搜索关键字**RIBENA**。
    
    ```
     e_commerce=# SELECT 
                      product_id,
                      product_name, 
                      retail_price                         
                  FROM products
                  WHERE product_name_tokens @@ to_tsquery('RIBENA'); 
    ```
    
6. 从下面的输出可以看出，您的查询按预期工作，而无需在搜索操作期间计算向量。
    
    ```
     product_id | product_name | retail_price
     ------------+--------------+--------------
               8 | RIBENA JUICE |         7.70
     (1 row)
    ```
    

## 结论

在本指南中，您已使用 PostgreSQL 内置函数在示例数据库中实现全文搜索。您还可以使用基本的全文搜索运算符，如**&**、**|**和**!**。最后，您学习了如何在处理大型数据集时通过预先计算向量来节省时间。使用本指南中的知识为您的下一个 PostgreSQL 搜索引擎项目提供支持。