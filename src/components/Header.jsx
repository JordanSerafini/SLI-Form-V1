import logoSLI from '../assets/logoSLI.png'

function Header() {
  return (
    <div className='gap-3 rounded-b-full text-white h-20 bg-gradient-to-r from-blue-light to-blue-strong flex items-center justify-center text-base font-semibold' style={{ position: 'sticky', top: '0', zIndex: '100' }}>
        
        <img src={logoSLI} alt="" className=' w-2/10 rounded-full'/>
        
          - Questionnaire satisfaction</div>
  )
}

export default Header