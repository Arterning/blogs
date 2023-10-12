import React, {useState, useEffect} from 'react';
import Layout from "@theme/Layout";

const initData = [
    {
        id: 1,
        title: 'Title 1',
        description: 'Description 1',
    },
    {
        id: 2,
        title: 'Title 2',
        description: 'Description 2',
    }
]

function MyComponent() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // const fetchData = async () => {
        //   const response = await fetch('https://example.com/api/data');
        //   const jsonData = await response.json();
        //   setData(jsonData);
        // };
        // fetchData();
        setData(initData)
    }, []);

    return (
        <Layout title="Hello" description="Hello React Page">
            <div>
                {data.map((item) => (
                    <div key={item.id}>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default MyComponent;
