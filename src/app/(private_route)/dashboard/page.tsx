'use client';

import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { FiRefreshCcw } from 'react-icons/fi';
import { setupApiClient } from '@/services/api';

interface OrdersProps {
  id: string;
  table: number;
  status: boolean;
  name?: string | null;
  draft: boolean;
}


const Dashboard = () => {

  const [listOrders, setListOrders] = useState<OrdersProps[]>([])

  useEffect(() => {
    const orders = async () => {
      const apiClient = setupApiClient();

      try {
        const res = await apiClient.get('/orders');
        setListOrders(res.data)
      } catch (error) {
        console.log(error);
      }
    }

    orders();
  }, [])


  const handleModalView = (id: string) => {
    alert(id)
  }

  return (
    <>
      <title>Painel - TP Pizzaria</title>
      <div>
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1 className='text-2xl font-semibold'>Últimos pedidos</h1>
            <button>
              <FiRefreshCcw size={25} color='#3fffa3' />
            </button>
          </div>
          <article className={styles.listOrders} >
            {
              listOrders &&
              listOrders.map((order) => {
                return (

                  <section className={styles.orderItem} key={order.id}>
                    <button onClick={() => handleModalView(order.id)}>
                      <div className={styles.tag}></div>
                      <span>Mesa {order.table}</span>
                    </button>
                  </section>

                )
              })
            }
          </article>
        </main>
      </div>
    </>

  )
}

export default Dashboard