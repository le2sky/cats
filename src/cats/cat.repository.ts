import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CommentsSchema } from 'src/comments/comments.schme';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';
import * as mongoose from 'mongoose';
/*
Service에는 비즈니스 로직을 구현하는데
만약 DB 관련 작업이나 다른 작업들이 복잡해지면
비즈니스 로직에 집중하는데 방해가 된다.
따라서 Service와 DB source 사이에 Repositoty를 두어
비즈니스 로직에 더욱 집중할 수 있도록 하고
중복 코드를 묶는다 (Repository 패턴)

=> 모듈간 책임 분리 및 비즈니스 로직 집중
=> 서비스 레이어에서 데이터의 출처와 관계 없이
동일한 방식으로 데이터를 접근하도록 함

ex) 여러 DB source 사용하면 데이터 출처가 많아짐 
*/
@Injectable()
export class CatsRespository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findAll() {
    const CommentsModel = mongoose.model('comments', CommentsSchema);

    //populate로 다른 document랑 이어줌
    const result = await this.catModel
      .find()
      .populate('comments', CommentsModel);

    return await result;
  }

  async existByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email });
    return result;
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const user = await this.catModel.findOne({ email });
    return user;
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  async findCatByIdWithoutPassword(
    catId: string | Types.ObjectId,
  ): Promise<Cat | null> {
    //password 빼고
    const cat = await this.catModel.findById(catId).select('-password');
    return cat;
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);
    cat.imgUrl = `http://localhost:8000/media/${fileName}`;

    const newCat = await cat.save();
    console.log(newCat);
    return newCat.readOnlyData;
  }
}
