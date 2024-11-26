import classNames from 'classnames';
import styles from './HomePageAdmin.module.scss';

import Dashboard from './DashBoard/DashBoard';
import Products from './Products/Products';

import Customers from './Users/Users';

import { useEffect, useState } from 'react';
import request from '../../../../config/config';
// import Blogger from './Blog/Blogger';
// import ChartLine from './ChartLine/ChartLine';

const cx = classNames.bind(styles);

function HomePage({ activeList }) {
    const [dataGames, setDataGames] = useState([]);
    const [show, setShow] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [idProduct, setIdProduct] = useState(Number);
    const [valueType, setValueType] = useState('');

    useEffect(() => {
        request.get('/api/getgame').then((res) => setDataGames(res.data));
        // console.log(dataGames)
    }, [show, showModalDelete, showModalEdit]);

    const handleShowModalAddGame = () => {
        setShow(!show);
    }; 

    const handleShowModalDeleteGame = (game_id) => {
        setShowModalDelete(!showModalDelete);
        setIdProduct(game_id);
    };

    const handleShowModalEditGame = (game_id) => {
        setShowModalEdit(!showModalEdit);
        setIdProduct(game_id);
    };
    return (
        <div className={cx('wrapper')}>
            {activeList === 'dash' ? (
                <div className={cx('dash')}>
                    <Dashboard />
                </div>
            ) : (
                <></>
            )}
            {activeList === 'product' ? (
                <div className={cx('products')}>
                    <Products
                        dataGames={dataGames}
                        show={show}
                        setShow={setShow}
                        handleShowModalAddGame={handleShowModalAddGame}
                        showModalDelete={showModalDelete}
                        setShowModalDelete={setShowModalDelete}
                        handleShowModalDeleteGame={handleShowModalDeleteGame}
                        game_id={idProduct}
                        handleShowModalEditGame={handleShowModalEditGame}
                        showModalEdit={showModalEdit}
                        setShowModalEdit={setShowModalEdit}
                        setValueType={setValueType}
                        valueType={valueType}
                    />
                </div>
            ) : (
                <></>
            )}

            {activeList === 'customer' ? (
                <div>
                    <Customers />
                </div>
            ) : (
                <></>
            )}

            {/* {activeList === 'blog' ? (
                <div>
                    <Blogger />
                </div>
            ) : (
                <></>
            )}
            {activeList === 'chart-line' ? (
                <div>
                    <ChartLine />
                </div>
            ) : (
                <></>
            )} */}
        </div>
    );
}

export default HomePage;
