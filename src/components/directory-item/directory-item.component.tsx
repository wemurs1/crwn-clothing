import { useNavigate } from 'react-router-dom';
import { Category } from '../../models/category';
import {
  DirectoryItemContainer,
  BackgroundImage,
  Body,
} from './directory-item.styles';

interface Props {
  category: Category;
}

const DirectoryItem = ({ category: { imageUrl, title, route } }: Props) => {
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageurl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>ShopNow</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
