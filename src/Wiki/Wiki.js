import React, { useEffect, useState } from 'react'
const url=`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&namespace=0&limit=15&search=`
const Wiki = () => {

    const [search,setSearch]=useState('programming')
    const [content,setContent]=useState([])
    const [link,setLink]=useState([])

    useEffect(()=>{
        if(search.length===0){
            const time=setTimeout(()=>{},200)
            return ()=>clearTimeout(time)
        }
        else{
            const time=setTimeout(()=>{
                fetch(url+`${search}`).then(response => {
                    return response.json()
                }).then(data => {
                    setContent(data[1])
                    setLink(data[3])
                })
            },500);
            return ()=>clearTimeout(time);
        }
    },[search]);

    return(
        <div>
            <input type={'search'} id='search' placeholder='Search here...' value={search} onChange={e => setSearch(e.target.value)}></input>
            <br/><br/>
            {content&&link ? content.map((data,i)=>{return <p key={i.toString()}><a id='suggestion' href={link[i]} target={'_blank'}>{data}</a></p>}):null}
        </div>
    )
}

export default Wiki