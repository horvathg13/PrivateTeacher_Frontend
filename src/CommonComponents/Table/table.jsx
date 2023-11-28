import './table.css';
import { FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { MdLastPage, MdFirstPage, MdNavigateNext, } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
const Table = () => {
    return (
        <div className="table-main-container">
            <div className="table-action-menu">
                <button className='btn table-btn'><FaFilter className='table-menu-icon'/>Filter</button>
            </div>
            <table>
                <thead>
                    <tr> 
                        <th><td>Hello <FaSortAmountUp className='table-icon' /><FaSortAmountDown className='table-icon' /></td></th>
                        <th><td>Hello</td></th>
                        <th><td>Hello</td></th>
                        <th><td>Hello</td></th>
                        <th><td>Hello</td></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Hello</td>
                        <td>Hello</td>
                        <td>Hello</td>
                        <td>Hello</td>
                        <td>Hello</td>
                    </tr>
                    <tr>
                        <td>Hello</td>
                        <td>Hello</td>
                        <td>Hello</td>
                        <td>Hello</td>
                        <td>Hello</td>
                    </tr>
                    <tr>
                        <td>Hello</td>
                        <td>Hello</td>
                        <td>Hello</td>
                        <td>Hello</td>
                        <td>Hello</td>
                    </tr>
                    <tr>
                        <td>Hello</td>
                        <td>Hello</td>
                        <td>Hello</td>
                        <td>Hello</td>
                        <td>Hello</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>Show/page<input type='number'/></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <div className="pagination flex">
                                <MdFirstPage className='table-icon' /><GrFormPrevious  className='table-icon'/>20 / 1500<MdNavigateNext className='table-icon'/><MdLastPage className='table-icon'/>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};
export default Table;