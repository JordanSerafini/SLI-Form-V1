import logoSLI from '../assets/logoSLI.png'

function Header() {
  return (
    <div className=' gap-3 text-white h-20 bg-blue-strong flex items-center justify-center text-xl' style={{ position: 'sticky', top: '0', zIndex: '100' }}>
        
        <img src={logoSLI} alt="" className=' w-1/10 rounded-full'/>
        
          - Questionnaire satisfaction</div>
  )
}

export default Header