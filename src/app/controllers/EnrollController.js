import { parseISO, addMonths } from 'date-fns';
import * as Yup from 'yup';
import Student from '../models/Student';

import Plan from '../models/Plan';

class EnrollController {
  async store(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fields fails' });
    }

    const { student_id, plan_id, start_date } = req.body;
    /**
     * ckeck student
     */

    const student = await Plan.findByPk(student_id);
    /**
     * check plan selected
     */

    const plan = await Plan.findByPk(plan_id);

    const dateStart = parseISO(start_date);
    const dateEnd = addMonths(parseISO(start_date), plan.duration);
    const pricePlan = plan.price * plan.duration;

    const enroll = {
      student_id,
      plan_id,
      start_date: dateStart,
      end_date: dateEnd,
      price: pricePlan,
    };

    return res.json(enroll);

    /**
     *
     *  Process Mail
     */
    await Queue.add(CancellationMail.key, {
      appointment,
    });
  }

  index(req, res) {
    return res.json(req.body);
  }
}
export default new EnrollController();
