import logoSLI from '../../assets/logoSLI.png'

function Header() {
  
  return (
    <div className=' shadow-header w-full gap-2  text-white h-20 bg-gradient-to-r from-blue-light to-blue-strong flex items-center justify-center text-xs font-semibold' style={{ position: 'sticky', top: '0', zIndex: '100' }}>
        
        <img src={logoSLI} alt="" className=' w-24 rounded-full ml-6 '/>
        
          - Solution Logique Informatique</div>
  )
}

export default Header