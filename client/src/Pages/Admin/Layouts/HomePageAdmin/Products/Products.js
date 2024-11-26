import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import { ModalAddGame, ModalDeleteGame, ModalEditGame } from '../../../Modal/Modal';

const cx = classNames.bind(styles);

function Products({
    dataGames,
    show,
    setShow,
    handleShowModalAddGame,
    showModalDelete,
    setShowModalDelete,
    handleShowModalDeleteGame,
    game_id,
    handleShowModalEditGame,
    showModalEdit,
    setShowModalEdit,
    setValueType,
    valueType,
}) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-product')}>
                <h1>Quản lý Game</h1>
                
                <button
                    onClick={handleShowModalAddGame}
                    style={{ margin: '20px' }}
                    type="button"
                    className="btn btn-primary"
                >
                    Thêm Game
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tên game</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Thể loại</th>
                        <th scope="col">Mô tả</th>
                    </tr>
                </thead>
                <tbody>
                    {dataGames
                        .filter((item) => valueType === '' || item.checkProducts === valueType)
                        .map((item) => (
                            <>
                                <tr key={item._id}>
                                    <th scope="row">{item.game_id}</th>
                                    <td>{item.game_name}</td>
                                    <td>
                                        <img
                                            style={{ width: '120px' }}
                                            loading="lazy"
                                            src={`http://localhost:5000/uploads/${item.img}`}
                                            alt="."
                                        />
                                    </td>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <button
                                            onClick={() => handleShowModalEditGame(item.game_id)}
                                            type="button"
                                            className="btn btn-warning"
                                        >
                                            Sửa Game
                                        </button>
                                        <button
                                            onClick={() => handleShowModalDeleteGame(item.game_id)}
                                            type="button"
                                            className="btn btn-danger"
                                        >
                                            Xóa Game
                                        </button>
                                    </td>
                                </tr>
                            </>
                        ))}
                </tbody>
            </table>
            <ModalAddGame show={show} setShow={setShow} />
            <ModalDeleteGame
                showModalDelete={showModalDelete}
                setShowModalDelete={setShowModalDelete}
                game_id={game_id}
            />
            <ModalEditGame showModalEdit={showModalEdit} setShowModalEdit={setShowModalEdit} game_id={game_id} />
        </div>
    );
}

export default Products;
