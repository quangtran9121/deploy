import classNames from 'classnames/bind';
import styles from './Main.module.scss';
import Banner from './Banner/Banner';
import GameArea from './GameArea/GameArea';


const cx = classNames.bind(styles);
function Main() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('slide')}>
                <Banner />
            </div>

            <div className={cx('item-products')}>
                <GameArea />
            </div>

            {/* <div>
                <News />
            </div> */}


        </div>
    );
}

export default Main;
