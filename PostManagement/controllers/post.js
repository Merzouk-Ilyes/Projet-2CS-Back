const Post = require('../models/post.js')
const fetch = require('node-fetch')
const { post } = require('../routes/post')
const notification = require('./notification')
/* the host only can use this method when he is validated*/
exports.addpost = async (req, res) => {
  const post = new Post(req.body)
  await post.save((err, post) => {
    if (err) {
      res.json(err) 
    } else {
      res.json(post)
    }
  })
}
/*this method could be used in the consultation page(see all posts) with no recommendation*/
exports.findAllPosts = async (req, res) => {
  Post.find()
    .then((result) => {
      // const Rating = [];
      // let sum;
      // for (let index = 0; index < result.length; index++) {
      //   const rating = result[index].rating;
      //   for (let i = 0; i < rating.length; i++) {
      //     console.log(rating[i].ratingValue)
      //     sum +=rating[i].ratingValue
      //   }
      //   console.log(sum);

      //   Rating.push(sum / rating.length);
      // }
      // console.log(Rating);
      res.json({ result })
    })
    .catch((err) => {
      res.json(err)
    })
}

/* method used when see more button in clicked */

exports.findPostById = async (req, res) => {
  const id = req.params.id
  const host = []
  Post.findById(id)
    .then((result) => {
      res.json(id)
    })
    .catch((err) => {
      console
    })

  // fetch('http://localhost:8002/userreserved?idpost=' + id_post)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data)
  //   })
}

/* method used when see more button in clicked */

exports.findPostByIdHost = async (req, res) => {
  const idHost = req.body.idHost
  Post.find({ idUser: idHost })
    .then((result) => {
      res.json({ result })
    })
    .catch((err) => {
      res.send(err)
    })
}

exports.findPostById = async (req, res) => {
  const id = req.params.id
  Post.findById(id)
    .then((result) => {
      res.json({ result })
    })
    .catch((err) => {
      res.send(err)
    })
}
//this method can be used to return agent's posts by id,host's posts by id ..
exports.findPostByIdUser = async (req, res) => {
  const idUser = req.query.idUser
  Post.find({ idUser: idUser })

    .then((result) => {
      res.json({ result })
    })
    .catch((err) => {
      res.send(err)
    })
}

/* used by the admin to change the post status  */

exports.UpdatePostStatus = async (req, res) => {
  var id_post = req.body.id
  const modifiedPost = Post.findById(id_post)
  Post.updateOne(modifiedPost, { verified: true })
    .then((result) => {
      // notification.addnotification();
      res.json({ result })
      notification.addnotification({
        query: { post: id_post, src: 'verified' },
      })
    })
    .catch((err) => {
      res.send(err)
    })
}
exports.UpdatePostById = async (req, res) => {
  const id = req.params.id
  const modifiedPost = Post.findById(id)
  Post.updateOne(modifiedPost, { verified: true })
    .then((result) => {
      res.json({ result })
    })
    .catch((err) => {
      res.send(err)
    })
}
/* used by the host to change the availability of his post*/
exports.UpdatePostAvailability = async (req, res) => {
  const id = req.params.id
  const availability = req.body.availability
  const modifiedPost = Post.findById(id)
  Post.updateOne(modifiedPost, { available: availability })
    .then((result) => {
      res.json({ result })
    })
    .catch((err) => {
      res.send(err)
    })
}

/* used by the host to change the availability of his post*/
exports.UpdatePostAvailability = async (req, res) => {
  const id = req.params.id
  const availability = req.body.availability
  const modifiedPost = Post.findById(id)

  Post.updateOne(modifiedPost, { available: availability })
    .then((result) => {
      res.json({ result })
    })
    .catch((err) => {
      res.send(err)
    })
}

/*returns how many(posts,non verified , verified, sighaled )*/

exports.stats = async (req, res) => {
  var statistics = []
  //okaay first let's find how many posts we have !
  Post.find().then((result) => {
    const posts_nbr = Object.keys(result).length
    statistics.push({ posts_nbr: posts_nbr })

    //then how many posts need to be verified
    Post.find({ verified: 'false' })
      .then((result) => {
        const posts_nonver_nbr = Object.keys(result).length
        statistics.push({ posts_nonver_nbr: posts_nonver_nbr })
        statistics.push({ posts_ver_nbr: posts_nbr - posts_nonver_nbr })
        Post.find({ signal: { etat: 'waiting' } }).then((result) => {
          const signal_nbr = Object.keys(result).length
          statistics.push({ signal_nbr: signal_nbr })
          res.json(statistics)
        })
      })
      .catch((err) => {
        res.send(err)
      })
  })
}

/*returns thepercentage of (posts per month with the status)*/

exports.percent = async (req, res) => {
  //some variables we need them to be global
  let statuss
  let current_posts = 0
  let last_month_posts = 0
  var today = new Date()
  var last_month = today.getMonth()
  var current_month = today.getMonth() + 1
  console.log(last_month)
  console.log(current_month)
  //get nbr of posts in this month
  ;(await Post.find()).forEach((element) => {
    if (element.createdAt.getMonth() + 1 == current_month) {
      current_posts = current_posts + 1
    }
  })
  console.log(current_posts)
  //get nbr of posts in previous month
  ;(await Post.find()).forEach((element) => {
    if (element.createdAt.getMonth() + 1 == last_month) {
      last_month_posts = last_month_posts + 1
    }
  })
  console.log(last_month_posts)

  //geting the right status and percentage
  if (last_month_posts !== 0) {
    let percentage_current = (current_posts * 100) / last_month_posts
    let percentage = percentage_current - 100
    if (percentage > 0) {
      statuss = 'won'
    } else {
      statuss = 'lost'
      percentage = -percentage
    }
    res.json({ statuss, percentage })
  } else {
    statuss = 'won'
    percentage = 100
    res.json({ statuss, percentage })
  }
}

//signaler post
exports.signalerpost = async (req, res) => {
  const id_post = req.body.post
  const id_user = req.body.iduser //we should get the value from the rqst
  const reson = req.body.reson //the value from the rating board
  const modifiedPost = Post.findById(id_post)
  const description = req.body.description
  Post.updateOne(modifiedPost, {
    //using push to add a new value without losing the old one
    $push: {
      signal: {
        description: description,
        reson: reson,
        clientId: id_user,
      },
    },
  })
    .then((result) => {
      res.json({ msg: 'post signaler ' }) //return success msg
    })
    .catch((err) => {
      res.send(err) //return err type
    })
}

exports.IdHostByIdPost = async (req, res) => {
  const id_post = req.query.post
  Post.find({ _id: id_post })
    .then((data) => {
      res.json(data) //return success msg
    })
    .catch((err) => {
      res.json(err)
    })
}

exports.deletePost = async (req, res) => {
  const id_post = req.body.post
  fetch('http://localhost:8002/PostHasReservations?idpost=' + id_post)
    .then((response) => response.json())
    .then((data) => {
      if (data.HasReservations == false) {
        Post.deleteOne({ _id: id_post })
          .then((result) => {
            res.json({ deleted: true }) //return success msg
          })
          .catch((err) => {
            res.send(err) //return err type
          })
      } else {
        res.json({ deleted: false }) //return success msg;
      }
    })
}

// Agent methods

exports.SetDate = async (req, res) => {
  const id_post = req.query.post
  const id_agent = req.query.agent
  const modifiedPost = Post.findById(id_post)
  const date = req.body.date
  fetch(
    'http://localhost:8001/addnotification?post=' +
      id_post +
      '&date=' +
      date +
      '&src=setdate'
  )
    .then((data) => {
      Post.updateOne(modifiedPost, {
        feedBack: {
          agent: id_agent,
          date_with_host: date,
        },
      })
        .then((result) => {
          res.json({ msg: 'date seted' }) //return success msg
        })
        .catch((err) => {
          res.send(err) //return err type
        })
    })
    .catch((err) => {
      res.send(err) //return err type
    })
}

// decline a poste then send a notification to the  concerned user
exports.DeclinePostWithReason = async (req, res) => {
  const idPost = req.body.idPost
  const idUser = req.body.idUser
  const declineReason = req.body.declineReason

  let notification = {
    id_host: idUser,
    type: 2,
    discreption: declineReason,
  }

  const declinedPost = Post.findById(idPost)

  Post.updateOne(declinedPost, {
    $set: { verified: 3, declineReason: declineReason },
  })
    .then((result) => {
      res.json({ result })
      fetch('http://localhost:8000/addnotification', {
        method: 'POST',
        body: JSON.stringify(notification),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.log(err))
    })
    .catch((err) => {
      res.send(err)
    })
}

exports.EditPost = async (req, res) => {
  const idPost = req.body.idPost
  const editable = req.body.editable
  const PricePerNight = req.body.PricePerNight
  const title = req.body.title
  const description = req.body.description

  if (editable == true) {
    const EditablePost = Post.findById(idPost)

    Post.updateOne(EditablePost, {
      $set: {
        PricePerNight: PricePerNight,
        title: title,
        description: description,
      },
    })
      .then((result) => {
        res.json({ result })
      })
      .catch((err) => {
        res.send(err)
      })
  } else {
    const EditablePost = Post.findById(idPost)

    Post.updateOne(EditablePost, { PricePerNight: PricePerNight })
      .then((result) => {
        res.json({ result })
      })
      .catch((err) => {
        res.send(err)
      })
  }
}

//add feed back by agent here we r not sheckig the agent's id cause they will be filterd by id agent in the first place
exports.SetFeedBack = async (req, res) => {
  const id_post = req.body.post
  const description = req.body.description
  // const validation = req.body.validation
  const modifiedPost = Post.findById(id_post)
  console.log(modifiedPost)
  Post.updateOne(modifiedPost, {
    $set: {
      'feedBack.description': description,
      // 'feedBack.validation': validation,
    },
  })
    .then((result) => {
      res.json({ msg: 'feedback has been set ' }) //return success msg
    })
    .catch((err) => {
      res.send(err) //return err type
    })
}
exports.GetFeedBackByIdAgent = async (req, res) => {
  const id_agent = req.query.agent
  Post.find({ 'feedBack.agent': id_agent })
    .then((result) => {
      res.json(result[0].feedBack)
    })
    .catch((err) => {
      res.send(err)
    })
}

exports.assignAgent = async (req, res) => {
  const post = req.body.post
  const agent = req.body.agent
  const modifiedPost = Post.findById(post)
  Post.updateOne(modifiedPost, {
    $push: {
      feedBack: { agent: agent },
    },
  })
    .then((result) => {
      notification.addnotification({
        query: { post: post, src: 'assignagent', agent: agent },
      })
      res.send(result)
    })
    .catch((err) => {
      res.send(err)
    })
}
