import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.user) {
      setUser(localStorage.user);
    }
  }, []);

  const render = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      return (
        <div>
          THIS IS HOME PAGE!
        </div>
      );
    }
  };

  return render();
};
