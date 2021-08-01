import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getPage } from '../../_actions/pages';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Link,
} from '@material-ui/core';
import './styles.css';

export default function Homepage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPage('homepage'));
  }, []);
  const homepage = useSelector((state) => state.page);
  const categories = useSelector((state) => state.categories);

  const flattenArray = (array, options = []) => {
    for (const item of array) {
      options.push({
        name: item.name,
        categoryImg: item.categoryImg,
        isFeatured: item.isFeatured,
        slug: item.slug,
      });
      if (item.children) {
        flattenArray(item.children, options);
      }
    }
    return options;
  };
  const itrCategories = flattenArray(categories);

  return (
    <Layout>
      <Container>
        <div className='hero'>
          <img
            src={`http://localhost:7000/public/media/pages/${homepage.heroImage}`}
            alt='hero image'
          />
        </div>
        <div>
          <h2>Featured Catgeories</h2>
          <Grid container>
            {itrCategories.map((item, idx) => {
              return item.isFeatured === 1 ? (
                <Grid item xs={6} sm={3} key={idx}>
                  <div className='categoriesCard'>
                    <Link
                      href={`/cat/${item.slug}`}
                      underline='none'
                      color='textPrimary'
                    >
                      <img
                        src={`http://localhost:7000/public/media/categories/${item.categoryImg}`}
                        alt={item.name}
                      />
                      <p>{item.name}</p>
                    </Link>
                  </div>
                </Grid>
              ) : null;
            })}
          </Grid>
        </div>
      </Container>
    </Layout>
  );
}
