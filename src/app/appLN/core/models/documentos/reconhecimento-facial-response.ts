export class ReconhecimentoFacialResponse {
    constructor(
        public result?: Result,
        public queryId?: string,
        public elapsedMilliseconds?: number,
        public status?: Status
    ) { }
}

export class Result {
    constructor(
        public distance?: number,
        public img_stats?: ImgStats,
        public result?: string,
        public confiability?: string,
    ) { }
}

export class ImgStats {
    constructor(
        public imga?: Img,
        public imgb?: Img
    ) { }
}

export class Img {
    constructor(
        public num_faces?: number,
        public quali_score?: number,
        public quality?: string,
        public score?: number
    ) { }
}

export class Status {
    constructor(
        public code?: string,
        public message?: string
    ) { }
}