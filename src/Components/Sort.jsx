import Dropdown from 'react-bootstrap/Dropdown';


const Sort = ({handleClick, handleClickSortOrder, sortBy, sortOrder}) => {

    return(
    <div>
            <Dropdown>
                <Dropdown.Toggle size="lg" variant="warning" id="dropdown-basic">
                    {sortBy}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={ () => handleClick("Date")}>Date</Dropdown.Item>
                    <Dropdown.Item onClick={ () => handleClick("Comment count")}>Comment count (default)</Dropdown.Item>
                    <Dropdown.Item onClick={ () => handleClick("Votes")}>Votes</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle size="lg" variant="warning" id="dropdown-sortOrder">
                    {sortOrder}
                </Dropdown.Toggle>

                <Dropdown.Menu >
                    <Dropdown.Item onClick={ () => handleClickSortOrder("Asc")}>Asc</Dropdown.Item>
                    <Dropdown.Item onClick={ () => handleClickSortOrder("Desc")}>Desc (default)</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
    </div>
    )
}

export default Sort;