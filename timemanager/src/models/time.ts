import mongoose from "mongoose";


// An interface that describes the properties
// that are requried to create a new Time
interface TimeAttrs {
  start: Date;
  end: Date;
  live_start: Date;
  live_end: Date;
  name: string;
  user_id: string;
  late: boolean;
  late_time_min: number;
  isHere:boolean;
  creator: string;
  status: string;
}

// An interface that describes the properties
// that a Time Model has
interface TimeModel extends mongoose.Model<TimeDoc> {
  build(attrs: TimeAttrs): TimeDoc;
}

// An interface that describes the properties
// that a Time Document has
interface TimeDoc extends mongoose.Document {
    start: Date;
    end: Date;
    live_start: Date;
    live_end: Date;
    name: string;
    user_id: string;
    creator: string;
    late: boolean;
    late_time_min: number;
    isHere:boolean;
    status:string;
}


const timeSchema = new mongoose.Schema(
  {
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    live_start: {
        type: Date,
        required: true,
      },
      live_end: {
        type: Date,
        required: true,
      },
    name: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    creator: {
        type: String,
        required: true,
      },
    late_time_min: {
        type: Number,
        required: true,
      },
      late: {
        type: Boolean,
        required: true,
      },
      isHere: {
        type: Boolean,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);


timeSchema.statics.build = (attrs: TimeAttrs) => {
  return new Time(attrs);
};

const Time = mongoose.model<TimeDoc, TimeModel>("Time", timeSchema);

export { Time };
