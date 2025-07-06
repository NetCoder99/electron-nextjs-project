import React from 'react'
import RankCard from '@/components/ranks/rankCard'
import rankDetails from '@/data/beltRanks';
import { useEffect, useState } from 'react';

export default function manageRanks() {
    const [beltData, setBeltData]     = useState([]);

    useEffect(() => {
      console.log(`manageRanks useEffect invoked`);
      const fetchData = async () => {
        console.log(`manageRanks fetching data`);
        const response = await window.electronAPI.invokeMain('handleGetRequirements');
        console.log(`manageRanks fetching response: ${response}`);
        setBeltData(response);
      };
      fetchData();
      return () => {};
    }, []);

    return (
        <div className="row d-flex justify-content-center small mainForm">
          <h4 className='text-center'>Manage belts and ranks</h4>
          <ul>
            {beltData.map((item, index) => (
              <li key={index}><RankCard {...item}></RankCard></li>  
            ))}
          </ul>
        </div>
    )
}