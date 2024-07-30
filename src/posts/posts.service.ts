import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './repositories/posts.repository';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsRepository.create(createPostDto);
  }

  async findAll(): Promise<PostEntity[]> {
    return this.postsRepository.findAll();
  }

  async findOne(id: number): Promise<PostEntity> {
    const post: PostEntity = await this.postsRepository.findOne(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    const post: PostEntity = await this.postsRepository.findOne(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.postsRepository.update(id, updatePostDto);
  }

  async remove(id: number): Promise<void> {
    const post: PostEntity = await this.postsRepository.findOne(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    await this.postsRepository.remove(id);
  }
}
