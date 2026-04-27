import * as migration_20260427_130435_init_blog_schema from './20260427_130435_init_blog_schema';

export const migrations = [
  {
    up: migration_20260427_130435_init_blog_schema.up,
    down: migration_20260427_130435_init_blog_schema.down,
    name: '20260427_130435_init_blog_schema'
  },
];
