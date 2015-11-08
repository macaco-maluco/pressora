import React from 'react'
import ReactDOM from 'react-dom'
import { App, Page, Section, Hero } from 'neal-react'
import './landing-page.scss'
import background from './background.jpg'
import './vendor/ga'

function startGame () {
  var playerName = document.getElementById('player-name').value
  document.location.href = `/game.html?playerName=${playerName}`
}

ReactDOM.render((
  <App>
    <Page>
      <Hero backgroundImage={background} className='text-center'>
        <h1 className='display-1'> Pressora </h1>
        <p className='lead'>Control your battleships remotely while dealing with the latency of space battles!</p>
        <p className='text-center'>
          <input id='player-name'
                 type='text'
                 placeholder='Your name'
                 className='form-control'
                 maxLength='30'/>
        </p>
        <p>
          <button onClick={startGame} className='btn btn-white'>
            Play
          </button>
          <span className='btn btn-white btn-vote'>
            <iframe src='http://nodeknockout.com/iframe/macaco-frito'
                    frameBorder={0}
                    scrolling='no'
                    allowTransparency='true'
                    width={115} height={25} />
          </span>
        </p>
      </Hero>

      <Section heading='In the age of 3D printers'>
        <p>It is the future! 3D printers are a commodity and SpaceX has finally made launching stuff into space affordable. So bored kids start to build battleships and fighting in space.</p>
        <p><strong>Pressora</strong> is a turn-based multiplayer game where, due to the latencies caused by the massive distances of the solar system, you must program a set of instructions first and them watch the battle unfolds.</p>
      </Section>

      <Section heading='Open source in the heart' className='gray'>
        Game was created and built during the <a hred='http://nodeknockout.com/'>Node KO 2015</a> hackathon by:
        <ul className='creators'>
          <li><img className='creator' src='https://s.gravatar.com/avatar/7b8970e1d573ee403152496257e763ad?s=50'/><a href='https://github.com/npejo'>Nikola Pejoski</a></li>
          <li><img className='creator' src='https://s.gravatar.com/avatar/147cbeb57f3100e97515c8ffb76bff4c?s=50'/><a href='https://github.com/marcioos/'>Marcio Oliveira</a></li>
          <li><img className='creator' src='https://s.gravatar.com/avatar/d0cb5e66c31a8c5b2ef0b8f57804d946?s=50'/><a href='http://github.com/pirelenito/'>Paulo Ragonha</a></li>
          <li><img className='creator' src='https://s.gravatar.com/avatar/141f83b6b19379276350a4c7d1a7175c?s=50'/><a href='https://github.com/tulios'>Tulio Ornelas</a></li>
        </ul>

        <p>We would also like to provide attributions to the following graphic assets used in the game:</p>
        <ul>
          <li>Graphic art provided by <a href='http://opengameart.org/content/space-game-art-pack-extended'>Tatermand</a></li>
          <li>Rocket favicon by Mister Pixel from the <a href='https://thenounproject.com'>Noun Project</a></li>
          <li>Button icons by <a href='http://www.picol.org'>PICOL</a>, <a href='http://www.wpzoom.com/'>WPZOOM</a>, <a href='http://linhpham.me/'>Linh Pham Thi Dieu</a>, <a href='https://icons8.com/'>Icons8</a> and <a href='https://www.iconfinder.com/DOTonPAPER'>DOTonPAPER</a></li>
        </ul>

        <p>The game will be make open-source once the competition is over!</p>

      </Section>
    </Page>
  </App>
), document.getElementById('main'))
