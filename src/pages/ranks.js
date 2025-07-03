import RankCard from '@/components/ranks/rankCard'
import React from 'react'

export default function manageRanks() {
  const rankDetails = [
    {'title' :'White Belt',  'img_source':"belt_images/white-belt-thumbnail.webp"},
    {'title' :'Orange Belt', 'img_source':"belt_images/orange-belt-thumbnail.webp"},
    {'title' :'Yellow Belt', 'img_source':"belt_images/yellow-belt-thumbnail.webp"},
    {'title' :'Blue Belt',   'img_source':"belt_images/blue-belt-thumbnail.webp"},
    {'title' :'Green Belt',  'img_source':"belt_images/green-belt-thumbnail.webp"},
    {'title' :'Purple Belt', 'img_source':"belt_images/purple-belt-thumbnail.webp"},
    {'title' :'Brown Belt',  'img_source':"belt_images/brown-belt-thumbnail.webp"},
    {'title' :'Black Belt',  'img_source':"belt_images/black-belt-thumbnail.webp"},
  ]
    return (
        <div class="row d-flex justify-content-center small mainForm">
          <h4 className='text-center'>Manage belts and ranks</h4>
          <ul>
            {rankDetails.map((item, index) => (
              <li><RankCard {...item}></RankCard></li>  
            ))}

            {/* <li><RankCard {...rank_details[0]}></RankCard></li>
            <li><RankCard {...rank_details[3]}></RankCard></li>
            <li><RankCard title='Yellow Belt' img_source="belt_images/yellow-belt-thumbnail.webp"></RankCard></li> */}

          </ul>
        </div>
    )
}