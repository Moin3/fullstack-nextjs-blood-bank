import Link from 'next/link';
import Image from 'next/image'
import heroPic from '../../../public/hero.png'

const InitialPage = () => {
  return (
    <>
      <div className="navbar bg-base-200 px-10">
        <div className="flex-1">
          <a className="normal-case text-lg md:text-xl lg:text-2xl text-red-600 font-semibold cursor-pointer">BE A HERO</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal">
          <li className="text-sm"><span className='font-semibold'>Contact us:</span><a href="mailto:moin.coder@gmail.com"> moin.coder@gmail.com</a></li>
          </ul>
        </div>
      </div>
      <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse items-center justify-center">
            <Image src={heroPic} alt="picture is not found" width={300} height={500}  className="rounded-lg shadow-lg"/>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-5xl text-center sm:text-left md:text-left font-bold text-red-300 drop-shadow-lg">Welcome to Blood Bank</h1>
              <p className="py-6 text-dark-50"><span className=' text-red-400 font-medium'>"Be a Lifesaver: Donate Blood Today!"</span><br/>

                  Welcome to our Blood Bank, where heroes like you make a difference.<br/>
                  Join us in the noble mission of saving lives. Your single donation can impact countless lives.<br/>
                  Step up, donate, and be a hero today!</p>
                  <Link href='/login'><button className="btn bg-red-400 hover:bg-red-600">Get Started</button></Link>
            </div>
          </div>
        </div>
    </>
    
  );
};

export default InitialPage;
