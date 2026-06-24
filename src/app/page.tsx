'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUserStore } from '@/store/useUserStore';

const registrationSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  mobile: z.string().regex(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
  agree: z.boolean().refine((value) => value === true, {
    message: 'Check this box if you want to proceed',
  }),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

export default function RegistrationPage() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = (data: RegistrationForm) => {
    setUser({ name: data.name, username: data.username, email: data.email, mobile: data.mobile });
    router.push('/categories');
  };

  return (
    <div className="flex h-screen w-screen bg-black text-white font-sans overflow-hidden">
      <div className="relative hidden md:flex md:w-1/2 h-full flex-col justify-end p-12">
        <div className="absolute inset-0 z-0 opacity-80">
          <Image 
            src="/banner-bg.png" 
            alt="Discover background" 
            fill 
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4">
            Discover new things on Superapp
          </h1>
        </div>
      </div>

      <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center px-6 lg:px-20 bg-black">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-[71px] font-single-day leading-[140%] text-[#72DB73] font-normal mb-2">Super app</h2>
            <p className="text-gray-400 text-sm">Create your new account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register('name')}
                placeholder="Name"
                className={`w-full p-3 rounded bg-zinc-900 border ${errors.name ? 'border-red-500' : 'border-zinc-700'} text-white focus:outline-none focus:border-green-500`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <input
                {...register('username')}
                placeholder="UserName"
                className={`w-full p-3 rounded bg-zinc-900 border ${errors.username ? 'border-red-500' : 'border-zinc-700'} text-white focus:outline-none focus:border-green-500`}
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
            </div>

            <div>
              <input
                {...register('email')}
                placeholder="Email"
                className={`w-full p-3 rounded bg-zinc-900 border ${errors.email ? 'border-red-500' : 'border-zinc-700'} text-white focus:outline-none focus:border-green-500`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <input
                {...register('mobile')}
                placeholder="Mobile"
                className={`w-full p-3 rounded bg-zinc-900 border ${errors.mobile ? 'border-red-500' : 'border-zinc-700'} text-white focus:outline-none focus:border-green-500`}
              />
              {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="agree"
                {...register('agree')}
                className="mt-1 accent-green-500 rounded"
              />
              <label htmlFor="agree" className="text-xs text-zinc-400 leading-normal">
                Share my registration data with Superapp
              </label>
            </div>
            {errors.agree && <p className="text-red-500 text-xs">{errors.agree.message}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-green-500 rounded-full font-bold text-black text-lg hover:bg-green-400 transition-colors tracking-wide mt-4"
            >
              SIGN UP
            </button>
          </form>

          <footer className="text-zinc-500 text-[11px] leading-relaxed">
            By clicking on Sign up, you agree to Superapp{' '}
            <span className="text-green-500 cursor-pointer">Terms and Conditions of Use</span>.
            <br className="my-2" />
            To learn more about how Superapp collects, uses, shares and protects your personal data please head over to Superapp{' '}
            <span className="text-green-500 cursor-pointer">Privacy Policy</span>.
          </footer>
        </div>
      </div>
    </div>
  );
}