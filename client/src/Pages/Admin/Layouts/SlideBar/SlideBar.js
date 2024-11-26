import classNames from 'classnames/bind';
import styles from './SlideBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog, faCartPlus, faChartLine, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';
const cx = classNames.bind(styles);

function SlideBar({ setActiveList }) {
    const handleActiveList = (data) => {
        setActiveList(data);
    };

    const token = document.cookie;
    const checkUser = jwtDecode(token);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('controller')}>
                <ul>
                    <li onClick={() => handleActiveList('dash')}>
                        <FontAwesomeIcon id={cx('icons')} icon={faHome} />
                        <h5>Trang Chủ</h5>
                    </li>

                    {checkUser.admin ? (
                        <>
                            <li onClick={() => handleActiveList('product')}>
                                <FontAwesomeIcon id={cx('icons')} icon={faCartPlus} />
                                <h5> Game</h5>
                            </li>

                            <li onClick={() => handleActiveList('customer')}>
                                <FontAwesomeIcon id={cx('icons')} icon={faUser} />
                                <h5> User </h5>
                            </li>

                            <li onClick={() => handleActiveList('chart-line')}>
                                <FontAwesomeIcon id={cx('icons')} icon={faChartLine} />
                                <h5> Genres</h5>
                            </li>
                        </>
                    ) : (
                        <></>
                    )}

                    {checkUser.admin || checkUser.employee ? (
                        <li onClick={() => handleActiveList('blog')}>
                            <FontAwesomeIcon id={cx('icons')} icon={faBlog} />
                            <h5> Bài Viết</h5>
                        </li>
                    ) : null}
                </ul>
            </div>
        </div>
    );
}

export default SlideBar;
