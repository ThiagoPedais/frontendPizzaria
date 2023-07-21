'use client';

import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { FiRefreshCcw } from 'react-icons/fi';
import { setupApiClient } from '@/services/api';
import Modal from 'react-modal';
import ModalOrder from '@/components/Modal';

interface OrdersProps {
  id: string;
  table: number;
  status: boolean;
  name?: string | null;
  draft: boolean;
}

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  }
  order: {
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  }
}


const Dashboard = () => {

  const [listOrders, setListOrders] = useState<OrdersProps[]>([])
  const [modalItem, setModalItem] = useState<OrderItemProps[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleCloseModal = () => {
    setModalVisible(false);
  }

  const handleModalView = async (id: string) => {
    const apiClient = setupApiClient();
    const res = await apiClient.get('/order/detail', {
      params: {
        order_id: id,
      }
    })
    setModalItem(res.data);
    console.log(res.data);

    setModalVisible(true);
  }

  const handleRefreshOrders = async () => {
    const apiClient = setupApiClient();    
    const res = await apiClient.get('/orders');
    setListOrders(res.data);
  }

  const handleFinishItem = async (id: string) => {
    const apiClient = setupApiClient();
    await apiClient.put('/order/finish', {
      order_id: id
    });
    const res = await apiClient.get('/orders');
    setListOrders(res.data);
    setModalVisible(false);
  }

  Modal.setAppElement("body")

  return (
    <>
      <title>Painel - TP Pizzaria</title>
      <div>
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1 className='text-2xl font-semibold'>Últimos pedidos</h1>
            <button onClick={handleRefreshOrders}>
              <FiRefreshCcw size={25} color='#3fffa3' />
            </button>
          </div>
          <article className={styles.listOrders} >

            {
              listOrders.length === 0 && (
                <span className={styles.emptyList}>
                  Nenhum pedido aberto foi encontrado...
                </span>
              )
            }

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
        {
          modalVisible && (
            <ModalOrder
              isOpen={modalVisible}
              onRequestClose={handleCloseModal}
              order={modalItem}
              handleFinishOrder={handleFinishItem}

            />
          )
        }
      </div>
    </>

  )
}

export default Dashboard