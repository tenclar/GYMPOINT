import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fields fails' });
    }

    const exist = await Plan.findOne({
      where: {
        title: req.body.title,
      },
    });

    if (exist) {
      return res.status(400).json({ error: 'Plan already exist.' });
    }

    const plan = await Plan.create(req.body);
    return res.json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fields fails' });
    }

    /*  const plan = await Plan.update(req.body, {
      where: {
        id: req.params.id,
      },
    }); */
    const plan = await Plan.findByPk(req.params.id);
    await plan.update(req.body);

    return res.json(plan);
  }

  async delete(req, res) {
    /*  const plan = await Plan.destroy({
      where: {
        id: req.params.id,
      },
    }); */
    const plan = await Plan.findByPk(req.params.id);
    await plan.destroy();

    return res.json(plan);
  }
}

export default new PlanController();
