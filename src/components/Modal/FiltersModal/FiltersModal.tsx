import React from 'react'
import { FaTimes } from 'react-icons/fa';
import { useAppDispatch } from '../../../hooks/redux';
import { toggleFiltersModal } from '../../../store/modal/modalSlice';
import { DeleteBox, FixedContainer } from '../Modal.styles';
import { Box, Container, TopBox } from './FiltersModal.style';

interface FiltersModalProps {
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
  filter: string;
}

const FiltersModal = ({ handleFilter, handleClear, filter }: FiltersModalProps) => {

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(toggleFiltersModal(false));
  }

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  }

  return (
    <FixedContainer onClick={handleClose}>
      <Container onClick={handleContainerClick}>
        <DeleteBox
          onClick={() => dispatch(toggleFiltersModal(false))}
          className="filters__close"
        >
          <FaTimes />
        </DeleteBox>
        <TopBox>
          <div className='filters__title'>정렬</div>
          <small onClick={handleClear} className="filters__delete">
            초기화
          </small>
        </TopBox>

        <Box>
          <div className='filters__subtitle'>우선순위</div>
          <div className='filters__check'>
            <input
              type="radio"
              name="filter"
              value="low"
              id="low"
              checked={filter === "low"}
              onChange={(e) => handleFilter(e)}
            />
            <label htmlFor='low'>낮은 순서로</label>
          </div>
          <div className='filters__check'>
            <input
              type="radio"
              name="filter"
              value="high"
              id="high"
              checked={filter === "high"}
              onChange={(e) => handleFilter(e)}
            />
            <label htmlFor='low'>높은 순서로</label>
          </div>
        </Box>



        <Box>
          <div className='filters__subtitle'>날짜</div>
          <div className='filters__check'>
            <input
              type="radio"
              name="filter"
              value="latest"
              id="new"
              checked={filter === "latest"}
              onChange={(e) => handleFilter(e)}
            />
            <label htmlFor='new'>최신 순으로</label>
          </div>
          <div className='filters__check'>
            <input
              type="radio"
              name="filter"
              value="created"
              id="create"
              checked={filter === "created"}
              onChange={(e) => handleFilter(e)}
            />
            <label htmlFor='create'>생성 순으로</label>
          </div>
          <div className='filters__check'>
            <input
              type="radio"
              name="filter"
              value="edited"
              id="edit"
              checked={filter === "edited"}
              onChange={(e) => handleFilter(e)}
            />
            <label htmlFor='edit'>수정 순으로</label>
          </div>
        </Box>


      </Container>
    </FixedContainer>
  )
}

export default FiltersModal
