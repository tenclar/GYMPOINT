import { parseISO, addMonths, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import * as Yup from 'yup';
import Mail from '../../lib/Mail';
import Student from '../models/Student';
import Enroll from '../models/Enroll';
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

    const student = await Student.findByPk(student_id);
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

    await Enroll.create(enroll);
    /**
     *
     *  Process Mail
     */
    /*  await Queue.add(CancellationMail.key, {
       appointment,
     });
   } */

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matrícula Efetuada',
      template: 'enrollment',
      context: {
        student: student.name,
        plan: plan.title,
        dutation: plan.duration,
        price: enroll.price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        end_date: format(enroll.end_date, "'dia' dd 'de' MMMM 'de' yyyy", {
          locale: ptBR,
        }),
      },
    });

    return res.json(enroll);
  }

  index(req, res) {
    return res.json(req.body);
  }
}
export default new EnrollController();
