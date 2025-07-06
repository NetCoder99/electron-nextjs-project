import React from 'react'
import RankCard from '@/components/ranks/rankCard'
import rankDetails from '@/data/beltRanks';

export default function manageRanks() {

    return (
        <div className="row d-flex justify-content-center small mainForm">
          <h4 className='text-center'>Manage belts and ranks</h4>
          <ul>
            {rankDetails.map((item, index) => (
              <li key={index}><RankCard {...item}></RankCard></li>  
            ))}
          </ul>
        </div>
    )
}